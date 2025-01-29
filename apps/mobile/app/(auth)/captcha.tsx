import { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ParallaxScrollView, Surface, Text } from '@/components/common';
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
          router.push('/(auth)/reset-password');
        } else if (captchaType === CaptchaType.REGISTER) {
          router.push('/(auth)/set-password');
        }
      }
    } catch (error) {
      if (typeof error === 'string') {
        showToast(error);
      } else {
        showToast(t('common.verifyCaptchaFailed'));
      }
    }
  };

  const handleResendCaptcha = async () => {
    try {
      const res = await UserService.sendCaptcha({ email, type: captchaType });
      if (res) {
        showToast(t('common.captchaSent'));
        setCountdown(60);
      }
    } catch (error) {
      if (typeof error === 'string') {
        showToast(error);
      } else {
        showToast(t('common.sendCaptchaFailed'));
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
    <ParallaxScrollView contentStyle={{ paddingTop: 0 }}>
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
            captcha: Yup.string().length(6, `${t('common.enter')}${t('common.captchaLength')}`)
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
                {countdown === 0 ? `${t('common.resendCaptcha')}` : `${countdown}秒后可重新发送`}
              </Text>

              <Button
                mode="contained"
                style={styles.button}
                // contentStyle={styles.buttonContent}
                // labelStyle={styles.buttonLabel}
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
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerImage: {
    alignSelf: 'center',
    width: 252,
    height: 269,
    resizeMode: 'contain'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#AEAEB2'
  },
  formContainer: {
    flex: 1
  },
  inputContainer: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderBottomWidth: 1,
    borderColor: '#E5E5EA'
  },
  chevronIcon: {
    width: 16,
    height: 16,
    marginLeft: 4
  },
  input: {
    flex: 1,
    fontSize: 16,
    backgroundColor: 'transparent'
  },
  agreementContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 24
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checked: {
    width: 12,
    height: 12,
    borderRadius: 2
  },
  agreementText: {
    fontSize: 12
  },
  link: {
    fontSize: 12,
    color: '#007BFF'
  },
  button: {
    marginTop: 19
  },
  buttonContent: {
    height: 46
  },
  buttonLabel: {
    fontSize: 16,
    color: '#fff'
  },
  countdownText: {
    fontSize: 12,
    marginTop: 16
  }
});
