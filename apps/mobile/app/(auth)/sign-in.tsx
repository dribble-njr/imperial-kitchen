import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Button } from 'react-native-paper';
import * as Yup from 'yup';
import { SignInDTO } from '@/types';
import { Surface, ParallaxScrollView, Text, HelloWave } from '@/components/common';
import { PasswordInput, FieldInput } from '@/components/form';
import { useAuth } from '@/context/AuthContext';
import { globalStyles } from '@/assets/styles';

export default function SignInScreen() {
  const { t } = useTranslation();
  const { signIn } = useAuth();
  const handleSignIn = async (values: SignInDTO) => {
    try {
      await signIn(values.email, values.password);
      router.push('/');
    } catch (error) {
      Alert.alert('Error');
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t('common.invalidEmail'))
      .required(`${t('common.enter')}${t('common.email')}`),
    password: Yup.string().required(`${t('common.enter')}${t('common.password')}`)
  });

  return (
    <ParallaxScrollView>
      <Surface style={styles.container}>
        <Surface style={globalStyles.hero}>
          <Text className="text-2xl font-bold mb-4">
            {t('auth.signIn.hero')} <HelloWave />
          </Text>
          <Text variant="labelLarge">{t('auth.signIn.description')}</Text>
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
          {({ handleSubmit }) => (
            <Surface style={globalStyles.form}>
              <FieldInput i18nKey="common" name="email" />

              <PasswordInput i18nKey="common" name="password" />

              <Button style={styles.button} mode="contained" onPress={() => handleSubmit()}>
                {t('common.confirm')}
              </Button>
            </Surface>
          )}
        </Formik>

        <Surface style={{ flex: 1, marginTop: 12, alignItems: 'center' }}>
          <Text type="secondary">
            {t('auth.signIn.haveNoAccount')}
            <Text type="link" onPress={() => router.push('/(auth)/guide')}>
              {t('auth.signIn.joinOrCreate')}
            </Text>
          </Text>
        </Surface>
      </Surface>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    gap: 8,
    justifyContent: 'space-between'
  },
  button: {
    marginTop: 32
  }
});
