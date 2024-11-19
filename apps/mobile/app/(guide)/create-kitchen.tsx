import FieldInput from '@/components/FieldInput';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { UserService } from '@/service';
import { RegisterAdminDTO } from '@imperial-kitchen/types';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import * as Yup from 'yup';

export default function CreateKitchen() {
  const { t } = useTranslation();
  const sendCaptcha = async (email: string) => {
    const res = await UserService.sendCaptcha(email);
    if (res) {
      console.log(res);
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
      <ThemedView className="flex-1 flex w-full gap-2 justify-between">
        <Text className="text-2xl font-bold mb-4">{t('createKitchen.title')}</Text>

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
            <>
              <FieldInput i18nKey="common" name="name" />

              <FieldInput
                i18nKey="common"
                name="email"
                right={
                  <TextInput.Affix
                    onPress={async () => {
                      await setFieldTouched('email', true, true);
                      if (!errors.email) {
                        sendCaptcha(values.email);
                      }
                    }}
                    text={t('common.sendCaptcha')}
                  />
                }
              />

              <FieldInput i18nKey="common" name="captcha" />

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
      </ThemedView>
    </ParallaxScrollView>
  );
}
