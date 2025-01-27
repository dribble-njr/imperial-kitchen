import { StackHeader } from '@/components/navigation';
import { Stack } from 'expo-router';

export default function AuthLayout() {
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
      <Stack.Screen name="sign-in" options={{ title: '' }} />
    </Stack>
  );
}
