import { GradientBackground, Surface } from '@/components/common';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function New() {
  const insets = useSafeAreaInsets();

  return (
    <Surface
      style={[
        {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 0
        }
      ]}
    >
      <GradientBackground height="full" />
      <Text style={{ marginTop: insets.top + 20 }}>New</Text>
      <Text>New</Text>
    </Surface>
  );
}
