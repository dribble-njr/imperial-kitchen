import { StackHeader } from '@/components/navigation';
import { Stack } from 'expo-router';

export default function SearchLayout() {
  return (
    <Stack
      screenOptions={{
        header: (props) => <StackHeader navProps={props} children={undefined} />
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: '',
          animation: 'slide_from_right'
        }}
      />
    </Stack>
  );
}
