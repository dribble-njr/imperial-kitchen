import FieldInput from '@/components/FieldInput';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { UserService } from '@/service';
import { RegisterMemberDto } from '@imperial-kitchen/types';
import { Formik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import * as Yup from 'yup';

const registerMemberSchema = Yup.object().shape({
  name: Yup.string().max(64, 'Too Long!').required('Please enter a name.'),
  password: Yup.string()
    .min(6, 'Too Short! must be at least 8 characters.')
    .max(64, 'Too Long!')
    .required('Please enter a password'),
  email: Yup.string().email('Invalid email').required('Please enter an email')
});

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

  const registerMember = async (values: RegisterMemberDto) => {
    try {
      const res = await UserService.registerMember(values);
      if (res) {
        Alert.alert('Success', 'Admin registered successfully');
      }
    } catch (error) {
      Alert.alert('Error');
    }
  };

  return (
    <ParallaxScrollView>
      <ThemedView className="flex-1 flex w-full gap-2 justify-between">
        <Text className="text-2xl font-bold mb-4">{t('joinKitchen.title')}</Text>
        <Formik
          initialValues={{ name: '', email: '', captcha: '', password: '', confirmedPassword: '', inviteCode: '' }}
          onSubmit={(values) => {
            const dto: RegisterMemberDto = {
              ...values
            };
            registerMember(dto);
          }}
          validationSchema={registerMemberSchema}
          validateOnChange={false}
        >
          {({ handleSubmit, values, setFieldTouched, errors }) => (
            <>
              <FieldInput i18nKey="joinKitchen" name="name" />
              <FieldInput
                i18nKey="joinKitchen"
                name="email"
                maxLength={64}
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
              <FieldInput maxLength={64} i18nKey="joinKitchen" name="captcha" right={64 - values.captcha.length} />
              <FieldInput
                i18nKey="createKitchen"
                name="password"
                secureTextEntry={displayPassword}
                right={<TextInput.Icon icon="eye" onPress={() => setDisplayPassword(!displayPassword)} />}
              />
              <FieldInput maxLength={64} i18nKey="joinKitchen" name="inviteCode" right={64 - values.captcha.length} />
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
