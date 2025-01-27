import { UserService } from '@/service';
import { RegisterAdminDTO } from '@/types';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Surface, ParallaxScrollView, Text } from '@/components/common';
import { CaptchaInput, FieldInput, PasswordInput } from '@/components/form';
import * as Yup from 'yup';
import { globalStyles } from '@/assets/styles';

export default function CreateKitchenScreen() {
  const { t } = useTranslation();
  const sendCaptcha = async (email: string) => {
    const res = await UserService.sendCaptcha(email);
    if (res) {
      Alert.alert('Success', 'Captcha sent successfully');
    }
  };

  const registerAdmin = async (values: RegisterAdminDTO) => {
    const res = await UserService.registerAdmin(values);
    if (res) {
      console.log(res);
      Alert.alert('Success', 'Admin registered successfully');
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(`${t('common.enter')}${t('common.name')}`),
    captcha: Yup.string().required(`${t('common.enter')}${t('common.captcha')}`),
    password: Yup.string().required(`${t('common.enter')}${t('common.password')}`),
    email: Yup.string()
      .email(t('common.invalidEmail'))
      .required(`${t('common.enter')}${t('common.email')}`)
  });

  return (
    <ParallaxScrollView>
      <Surface className="flex-1 flex w-full gap-2 justify-between">
        <Surface style={globalStyles.hero}>
          <Text className="text-2xl font-bold mb-4">{t('auth.createKitchen.hero')}</Text>
          <Text variant="labelLarge">{t('auth.createKitchen.description')}</Text>
        </Surface>

        <Formik
          initialValues={{ name: '', email: '', captcha: '', password: '', confirmedPassword: '' }}
          onSubmit={(values) => {
            const dto: RegisterAdminDTO = {
              ...values,
              kitchenName: `${values.name}'s Kitchen`
            };
            registerAdmin(dto);
          }}
          validationSchema={validationSchema}
        >
          {({ handleSubmit, values, errors, setFieldTouched }) => (
            <Surface style={globalStyles.form}>
              <FieldInput i18nKey="common" name="name" />

              <CaptchaInput
                i18nKey="common"
                name="email"
                onSendCaptcha={async () => {
                  await setFieldTouched('email', true, true);
                  if (!errors.email) {
                    sendCaptcha(values.email);
                  }
                }}
              />

              <FieldInput i18nKey="common" name="captcha" />

              <PasswordInput i18nKey="common" name="password" />

              <Button style={styles.button} mode="contained" onPress={() => handleSubmit()}>
                {t('common.confirm')}
              </Button>
            </Surface>
          )}
        </Formik>
      </Surface>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 32
  }
});
