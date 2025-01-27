import { globalStyles } from '@/assets/styles';
import { Surface, ParallaxScrollView, Text } from '@/components/common';
import { FieldInput } from '@/components/form';
import { useToast } from '@/context/ToastContext';
import { UserService } from '@/service';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import * as Yup from 'yup';
import SignUpHero from '@/assets/images/sign-up.svg';
import { useRouter } from 'expo-router';
import { CaptchaType } from '@/types';
import { useAuthFlowContext } from './_layout';

export default function SignUpScreen() {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { email, setEmail } = useAuthFlowContext();
  const router = useRouter();

  const sendCaptcha = async (values: { email: string }) => {
    try {
      setEmail(values.email);
      const res = await UserService.sendCaptcha({ email: values.email, type: CaptchaType.REGISTER });
      if (res) {
        showToast(t('common.captchaSent'));
        router.push('/(auth)/captcha');
      }
    } catch (error) {
      showToast(error as string);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t('common.invalidEmail'))
      .required(`${t('common.enter')}${t('common.email')}`)
  });

  return (
    <ParallaxScrollView>
      <Surface style={globalStyles.hero}>
        <SignUpHero width="100%" />
        <Text variant="titleLarge" style={{ textAlign: 'center' }}>
          {t('auth.signUp.hero')}
        </Text>
        <Text variant="labelLarge" style={{ textAlign: 'center', marginTop: 8 }}>
          {t('auth.signUp.description')}
        </Text>
      </Surface>

      <Formik initialValues={{ email }} onSubmit={sendCaptcha} validationSchema={validationSchema}>
        {({ handleSubmit, validateForm }) => (
          <Surface style={globalStyles.form}>
            <FieldInput i18nKey="common" name="email" />

            <Button
              style={styles.button}
              mode="contained"
              onPress={async () => {
                const errors = await validateForm();
                if (Object.keys(errors).length > 0) {
                  showToast(Object.values(errors)[0]);
                  return;
                }
                handleSubmit();
              }}
            >
              {t('auth.signUp.title')}
            </Button>
          </Surface>
        )}
      </Formik>

      <Surface style={{ flex: 1, alignItems: 'center' }}>
        <Text type="secondary">
          {t('auth.signUp.haveAccount')}
          <Text type="link" onPress={() => router.push('/(auth)/sign-in')}>
            {t('auth.signIn.title')}
          </Text>
        </Text>
      </Surface>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 32
  }
});
