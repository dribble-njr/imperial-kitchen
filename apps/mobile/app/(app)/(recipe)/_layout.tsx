import { Stack } from 'expo-router';

export default function RecipeLayout() {
  return (
    <Stack
      screenOptions={{
        animation: 'slide_from_right',
        headerShown: false
      }}
    >
      <Stack.Screen
        name="create-recipe"
        options={{
          presentation: 'modal',
          title: ''
        }}
      />
    </Stack>
  );
}
