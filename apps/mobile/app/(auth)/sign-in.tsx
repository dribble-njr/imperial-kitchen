import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Button } from 'react-native-paper';
import * as Yup from 'yup';
import { SignInDTO } from '@/types';
import { Surface, Text } from '@/components/common';
import { PasswordInput, FieldInput } from '@/components/form';
import { useAuth } from '@/context/AuthContext';
import { globalStyles } from '@/assets/styles';
import SignInHero from '@/assets/images/sign-in.svg';
import { useToast } from '@/context/ToastContext';
import { AuthService } from '@/service';

export default function SignInScreen() {
  const { showToast } = useToast();
  const { t } = useTranslation();
  const { signIn } = useAuth();
  const handleSignIn = async (values: SignInDTO) => {
    try {
      const res = await AuthService.signIn({
        email: values.email,
        password: values.password
      });
      signIn(res);
      router.replace('/');
    } catch (error) {
      showToast(error as string);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t('auth.invalidEmail'))
      .required(t('common.enter') + t('common.email')),
    password: Yup.string().required(t('common.enter') + t('common.password'))
  });

  return (
    <Surface>
      <Surface style={globalStyles.hero}>
        <SignInHero width="100%" />
        <Text variant="titleLarge" style={{ textAlign: 'center' }}>
          {t('auth.signIn.hero')}
        </Text>
        <Text variant="labelLarge" style={{ textAlign: 'center', marginTop: 8 }}>
          {t('auth.signIn.description')}
        </Text>
      </Surface>

      <Formik
        initialValues={{ email: 'admin@test.com', password: 'admin123' }}
        onSubmit={(values) => {
          const dto: SignInDTO = {
            ...values
          };
          handleSignIn(dto);
        }}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, validateForm }) => (
          <Surface style={globalStyles.form}>
            <FieldInput i18nKey="common" name="email" />
            <PasswordInput i18nKey="common" name="password" />

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
              {t('common.confirm')}
            </Button>
          </Surface>
        )}
      </Formik>

      <Surface style={{ flex: 1, alignItems: 'center' }}>
        <Text type="secondary">
          {t('auth.signIn.haveNoAccount')}
          <Text type="link" onPress={() => router.push('/(auth)/guide')}>
            {t('auth.signIn.joinOrCreate')}
          </Text>
        </Text>
      </Surface>
    </Surface>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20
  }
});
