import { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ParallaxScrollView, Surface, Text } from '@/components/common';
import { Button } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter, useLocalSearchParams } from 'expo-router';
import DigitInput from '@/components/common/DigitInput';
import { useToast } from '@/context/ToastContext';
import { AuthService } from '@/service';
import CaptchaHero from '@/assets/images/captcha.svg';
import { globalStyles } from '@/assets/styles';
import { useTranslation } from 'react-i18next';
import { useAuthFlowContext } from './_layout';

export default function CaptchaScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { phoneNumber, type } = useLocalSearchParams<{
    phoneNumber: string;
    type: 'forgot-password' | 'sign-up';
  }>();
  const [countdown, setCountdown] = useState(59);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const { showToast } = useToast();
  const { email } = useAuthFlowContext();

  const handleVerify = async (values: { captcha: string }) => {
    try {
      let res;
      if (type === 'forgot-password') {
        res = await AuthService.verifyForgotPasswordCaptcha({ phoneNumber, captcha: values.captcha });
        if (res) {
          router.push({
            pathname: '/reset-password',
            params: { accessToken: res.accessToken }
          });
        }
      } else if (type === 'sign-up') {
        res = await AuthService.verifySignUpCaptcha({ phoneNumber, captcha: values.captcha });
        if (res) {
          router.push({
            pathname: '/create-password',
            params: { phoneNumber, captcha: values.captcha }
          });
        }
      }
    } catch (error) {
      if (typeof error === 'string') {
        showToast(error);
      } else {
        showToast('验证失败');
      }
    }
  };

  const handleResendCaptcha = async () => {
    try {
      let res;
      if (type === 'forgot-password') {
        res = await AuthService.forgotPasswordSendCaptcha(phoneNumber);
      } else if (type === 'sign-up') {
        res = await AuthService.signUpSendCaptcha(phoneNumber);
      }

      if (res) {
        showToast('已发送验证码');
        setCountdown(60);
      }
    } catch (error) {
      if (typeof error === 'string') {
        showToast(error);
      } else {
        showToast('发送失败');
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
            captcha: Yup.string().length(6, '请输入6位验证码').required('请输入验证码')
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
                {countdown === 0 ? '重新发送' : `${countdown}秒后可重新发送`}
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
                下一步
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
