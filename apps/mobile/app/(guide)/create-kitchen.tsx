import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { UserService } from '@/service';
import { RegisterAdminDto } from '@imperial-kitchen/types';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
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

  const registerAdmin = async (values: RegisterAdminDto) => {
    const res = await UserService.registerAdmin(values);
    if (res) {
      console.log(res);
      Alert.alert('Success', 'Admin registered successfully');
    }
  };

  return (
    <ParallaxScrollView>
      <ThemedView className="flex-1 flex w-full gap-2 justify-between">
        <Text className="text-2xl font-bold mb-4">{t('createKitchen.title')}</Text>

        <Formik
          initialValues={{ name: '', email: '', captcha: '', password: '', confirmedPassword: '' }}
          onSubmit={(values) => {
            const dto: RegisterAdminDto = {
              ...values,
              kitchenName: `${values.name}'s Kitchen`
            };
            registerAdmin(dto);
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().max(64, 'Too Long!').required('Please enter a name.'),
            password: Yup.string()
              .min(6, 'Too Short! must be at least 8 characters.')
              .max(64, 'Too Long!')
              .required('Please enter a password'),
            email: Yup.string().email('Invalid email').required('Please enter an email')
          })}
          validateOnBlur={true}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <>
              <ThemedView>
                <TextInput
                  maxLength={64}
                  mode="outlined"
                  label="name"
                  value={values.name}
                  error={!!errors.name}
                  placeholder="Enter your name..."
                  onChangeText={handleChange('name')}
                />
                <HelperText type="error" visible={!!errors.name}>
                  {errors.name}
                </HelperText>
              </ThemedView>

              <ThemedView>
                <TextInput
                  maxLength={64}
                  mode="outlined"
                  label="Email"
                  value={values.email}
                  error={!!errors.email}
                  right={<TextInput.Affix onPress={() => sendCaptcha(values.email)} text={t('common.captcha')} />}
                  placeholder="Enter your email..."
                  onChangeText={handleChange('email')}
                />

                <HelperText type="error" visible={!!errors.email}>
                  {errors.email}
                </HelperText>
              </ThemedView>

              <ThemedView>
                <TextInput
                  maxLength={64}
                  mode="outlined"
                  label="Captcha"
                  value={values.captcha}
                  error={!!errors.captcha}
                  right={64 - values.captcha.length}
                  placeholder="Enter your password..."
                  onChangeText={handleChange('captcha')}
                />
                <HelperText type="error" visible={!!errors.captcha}>
                  {errors.captcha}
                </HelperText>
              </ThemedView>

              <ThemedView>
                <TextInput
                  maxLength={64}
                  mode="outlined"
                  label="Password"
                  value={values.password}
                  error={!!errors.password}
                  right={<TextInput.Icon icon="eye" onPress={() => {}} />}
                  placeholder="Enter your password..."
                  onChangeText={handleChange('password')}
                />
                <HelperText type="error" visible={!!errors.password}>
                  {errors.password}
                </HelperText>
              </ThemedView>

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
