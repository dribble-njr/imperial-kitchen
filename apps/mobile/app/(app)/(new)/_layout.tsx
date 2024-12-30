import { Stack } from 'expo-router';

export default function NewLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: 'fullScreenModal'
      }}
    >
      <Stack.Screen name="new" />
    </Stack>
  );
}
