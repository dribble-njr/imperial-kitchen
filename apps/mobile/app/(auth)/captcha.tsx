import { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Surface, Text } from '@/components/common';
import { Button } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'expo-router';
import DigitInput from '@/components/common/DigitInput';
import { useToast } from '@/context/ToastContext';
import { UserService } from '@/service';
import CaptchaHero from '@/assets/images/captcha.svg';
import { globalStyles } from '@/assets/styles';
import { useTranslation } from 'react-i18next';
import { useAuthFlowContext } from './_layout';
import { CaptchaType } from '@/types';

export default function CaptchaScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { captchaType, email, setCaptcha } = useAuthFlowContext();
  const [countdown, setCountdown] = useState(59);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const { showToast } = useToast();

  const handleVerify = async (values: { captcha: string }) => {
    try {
      const res = await UserService.verifyCaptcha({ email, captcha: values.captcha, type: captchaType });
      if (res) {
        setCaptcha(values.captcha);
        if (captchaType === CaptchaType.RESET_PASSWORD) {
          router.push('/(auth)/set-password');
        } else if (captchaType === CaptchaType.REGISTER) {
          router.push('/(auth)/set-password');
        }
      }
    } catch (error) {
      if (typeof error === 'string') {
        showToast(error);
      } else {
        showToast(t('auth.captcha.verifyFailed'));
      }
    }
  };

  const handleResendCaptcha = async () => {
    try {
      const res = await UserService.sendCaptcha({ email, type: captchaType });
      if (res) {
        showToast(t('auth.captcha.sent'));
        setCountdown(60);
      }
    } catch (error) {
      if (typeof error === 'string') {
        showToast(error);
      } else {
        showToast(t('auth.captcha.sendFailed'));
      }
    }
  };

  useEffect(() => {
    if (countdown > 0) {
      timerRef.current = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [countdown]);

  return (
    <Surface>
      <Surface style={globalStyles.hero}>
        <CaptchaHero width="100%" />
        <Text variant="titleLarge" style={{ textAlign: 'center' }}>
          {t('auth.captcha.hero')}
        </Text>
        <Text variant="labelLarge" style={{ textAlign: 'center', marginTop: 8 }}>
          {t('auth.captcha.description')} {email}
        </Text>
      </Surface>

      <Surface style={styles.formContainer}>
        <Formik
          initialValues={{ captcha: '' }}
          validationSchema={Yup.object().shape({
            captcha: Yup.string().length(6, t('auth.captcha.length')).required(t('auth.captcha.hero'))
          })}
          onSubmit={handleVerify}
        >
          {({ handleSubmit, values, setFieldValue, validateForm }) => (
            <>
              <DigitInput value={values.captcha} onChange={(value) => setFieldValue('captcha', value)} length={6} />

              <Text
                type={countdown === 0 ? 'link' : 'secondary'}
                style={styles.countdownText}
                onPress={handleResendCaptcha}
              >
                {countdown === 0 ? t('auth.captcha.resend') : t('auth.captcha.countdown', { count: countdown })}
              </Text>

              <Button
                mode="contained"
                style={styles.button}
                onPress={async () => {
                  const errors = await validateForm();
                  if (Object.keys(errors).length > 0) {
                    showToast(Object.values(errors)[0]);
                    return;
                  }
                  handleSubmit();
                }}
              >
                {t('common.next')}
              </Button>
            </>
          )}
        </Formik>
      </Surface>
    </Surface>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1
  },
  button: {
    marginTop: 19
  },
  countdownText: {
    fontSize: 12,
    marginTop: 16
  }
});
