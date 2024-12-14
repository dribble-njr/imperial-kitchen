import { Stack } from 'expo-router';

export default function MenuLayout() {
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="recipe" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
