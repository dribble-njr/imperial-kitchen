import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Button, Text } from 'react-native-paper';
import * as Yup from 'yup';
import { SignInDTO } from '@imperial-kitchen/types';
import { PasswordInput, Surface, FieldInput, ParallaxScrollView } from '@/components';
import { useToken } from '@/context/AuthContext';

export default function SignIn() {
  const { t } = useTranslation();
  const { signIn } = useToken();
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
        <Text className="text-2xl font-bold mb-4">{t('signIn')}</Text>

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
            <>
              <FieldInput i18nKey="common" name="email" />

              <PasswordInput i18nKey="common" name="password" />

              <Button style={styles.button} mode="contained" onPress={() => handleSubmit()}>
                {t('common.confirm')}
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
    flex: 1,
    width: '100%',
    gap: 8,
    justifyContent: 'space-between'
  },
  button: {
    marginTop: 32
  }
});
