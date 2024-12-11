import FieldInput from '@/components/FieldInput';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Button, Text, TextInput } from 'react-native-paper';
import { SignInDTO } from '@imperial-kitchen/types';
import { AuthService } from '@/service';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import { Surface } from '@/components';

export default function Login() {
  const { t } = useTranslation();
  const handleLogin = async (values: SignInDTO) => {
    try {
      const res = await AuthService.signIn(values);
      if (res) {
        Alert.alert('Success', 'sign in successfully');
        router.push('/');
      }
    } catch (error) {
      Alert.alert('Error');
    }
  };

  return (
    <ParallaxScrollView>
      <Surface className="flex-1 flex w-full gap-2 justify-between">
        <Text className="text-2xl font-bold mb-4">{t('signIn')}</Text>

        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values) => {
            const dto: SignInDTO = {
              ...values
            };
            handleLogin(dto);
          }}
        >
          {({ handleSubmit }) => (
            <>
              <FieldInput i18nKey="common" name="email" />

              <FieldInput
                i18nKey="common"
                name="password"
                secureTextEntry
                right={<TextInput.Icon icon="eye" onPress={() => {}} />}
              />

              <Button mode="contained" onPress={() => handleSubmit()}>
                {t('common.confirm')}
              </Button>
            </>
          )}
        </Formik>
      </Surface>
    </ParallaxScrollView>
  );
}
