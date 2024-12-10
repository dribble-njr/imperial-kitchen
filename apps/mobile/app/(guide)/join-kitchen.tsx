import { Surface, FieldInput, ParallaxScrollView } from '@/components';
import { UserService } from '@/service';
import { RegisterMemberDTO } from '@imperial-kitchen/types';
import { Formik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import * as Yup from 'yup';

export default function JoinKitchen() {
  const { t } = useTranslation();
  const [displayPassword, setDisplayPassword] = useState(false);
  const sendCaptcha = async (email: string) => {
    try {
      await UserService.sendCaptcha(email);
      Alert.alert('Success', 'Captcha sent successfully');
    } catch (error) {
      Alert.alert('Error');
    }
  };

  const registerMember = async (values: RegisterMemberDTO) => {
    try {
      const res = await UserService.registerMember(values);
      if (res) {
        Alert.alert('Success', 'Member registered successfully');
      }
    } catch (error) {
      Alert.alert('Error');
    }
  };

  const registerMemberSchema = Yup.object().shape({
    name: Yup.string().required(`${t('common.enter')}${t('common.name')}`),
    password: Yup.string().required(`${t('common.enter')}${t('common.password')}`),
    email: Yup.string()
      .email(t('common.invalidEmail'))
      .required(`${t('common.enter')}${t('common.email')}`),
    captcha: Yup.string().required(`${t('common.enter')}${t('common.captcha')}`),
    inviteCode: Yup.string().required(`${t('common.enter')}${t('common.inviteCode')}`)
  });

  return (
    <ParallaxScrollView>
      <Surface className="flex-1 flex w-full gap-2 justify-between">
        <Text className="text-2xl font-bold mb-4">{t('joinKitchen.title')}</Text>
        <Formik
          initialValues={{ name: '', email: '', captcha: '', password: '', inviteCode: '' }}
          onSubmit={(values) => {
            const dto: RegisterMemberDTO = {
              ...values
            };
            registerMember(dto);
          }}
          validationSchema={registerMemberSchema}
        >
          {({ handleSubmit, values, setFieldTouched, errors }) => (
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
                secureTextEntry={displayPassword}
                right={<TextInput.Icon icon="eye" onPress={() => setDisplayPassword(!displayPassword)} />}
              />
              <FieldInput i18nKey="common" name="inviteCode" />
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
