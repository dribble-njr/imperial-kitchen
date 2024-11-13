import { ThemedView } from '@/components/ThemedView';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import * as Yup from 'yup';

export default function CreateKitchen() {
  const { t } = useTranslation();
  const sendCaptcha = () => {
    console.log('sendCaptcha');
  };

  return (
    <ThemedView className="flex-1 items-center justify-between p-4 px-8">
      <ThemedView className="my-8 w-full">
        <Text className="text-2xl font-bold">{t('createKitchen.title')}</Text>

        <ThemedView className="my-8 w-full flex-1 gap-2">
          <Formik
            initialValues={{ username: '', email: '', captcha: '', password: '', confirmedPassword: '' }}
            onSubmit={(values) => {
              // TODO: Create kitchen
              console.log(values);
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().min(6, 'Too Short!').max(64, 'Too Long!').required('Please enter a username.'),
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
                    label="Username"
                    value={values.username}
                    error={!!errors.username}
                    placeholder="Enter your username..."
                    onChangeText={handleChange('username')}
                  />
                  <HelperText type="error" visible={!!errors.username}>
                    {errors.username}
                  </HelperText>
                </ThemedView>

                <ThemedView>
                  <TextInput
                    maxLength={64}
                    mode="outlined"
                    label="Email"
                    value={values.email}
                    error={!!errors.email}
                    right={<TextInput.Affix onPress={sendCaptcha} text={t('common.captcha')} />}
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
                    placeholder="Enter your password..."
                    onChangeText={handleChange('password')}
                  />
                  <HelperText type="error" visible={!!errors.password}>
                    {errors.password}
                  </HelperText>
                </ThemedView>

                <ThemedView>
                  <TextInput
                    maxLength={64}
                    mode="outlined"
                    label="Confirmed Password"
                    value={values.confirmedPassword}
                    error={!!errors.confirmedPassword}
                    placeholder="Confirm your password..."
                    onChangeText={handleChange('confirmedPassword')}
                  />
                  <HelperText type="error" visible={!!errors.confirmedPassword}>
                    {errors.confirmedPassword}
                  </HelperText>
                </ThemedView>

                <Button mode="contained" onPress={() => handleSubmit()}>
                  {t('common.confirm')}
                </Button>
              </>
            )}
          </Formik>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}
