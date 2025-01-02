import { GradientBackground, Surface } from '@/components/common';
import { StackHeader } from '@/components/navigation';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function NewLayout() {
  const { t } = useTranslation();

  return (
    <Surface style={{ flex: 1 }}>
      {/* Sub route will destroy firstly when navigating back, add a background to prevent flickering */}
      {/* https://github.com/dribble-njr/imperial-kitchen/pull/40 */}
      <GradientBackground height="full" />

      <Stack
        screenOptions={{
          header: (props) => <StackHeader navProps={props} children={undefined} />
        }}
      >
        <Stack.Screen name="new" options={{ headerShown: false }} />
        <Stack.Screen name="dish" options={{ title: t('create.dish') }} />
      </Stack>
    </Surface>
  );
}
