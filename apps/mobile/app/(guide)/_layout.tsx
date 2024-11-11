import { Stack } from 'expo-router';

export default function GuideLayout() {
  return (
    <Stack
      initialRouteName="Guide"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right'
      }}
    >
      <Stack.Screen name="guide" />
      <Stack.Screen name="create-kitchen" />
      <Stack.Screen name="join-kitchen" />
    </Stack>
  );
}
