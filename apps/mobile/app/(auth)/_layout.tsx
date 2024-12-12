import StackHeader from '@/components/StackHeader';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function AuthLayout() {
  const { t } = useTranslation();

  return (
    <Stack
      screenOptions={{
        animation: 'slide_from_right',
        header: (props) => <StackHeader navProps={props} children={undefined} />
      }}
    >
      <Stack.Screen name="guide" options={{ headerShown: false }} />
      <Stack.Screen name="create-kitchen" options={{ title: '' }} />
      <Stack.Screen name="join-kitchen" options={{ title: '' }} />
      <Stack.Screen name="sign-in" options={{ title: t('auth.signIn.title') }} />
    </Stack>
  );
}
