import { StackHeader } from '@/components/navigation';
import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        header: (props) => <StackHeader navProps={props} children={undefined} />
      }}
    >
      <Stack.Screen name="setting" options={{ title: '设置' }} />
    </Stack>
  );
}
