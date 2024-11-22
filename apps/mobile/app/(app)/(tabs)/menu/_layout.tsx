import { Stack } from 'expo-router';

export default function MenuLayout() {
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        animation: 'flip'
      }}
    >
      <Stack.Screen name="recipe" />
    </Stack>
  );
}
