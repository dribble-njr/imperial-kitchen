import { ComponentColors } from '@/constants/Colors';
import { TokenProvider } from '@/context/AuthContext';
import { SseProvider } from '@/context/SseContext';
import '@/locales/i18n';
import { Slot } from 'expo-router';
import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../global.css';

export default function Root() {
  const colorScheme = useColorScheme();

  const paperTheme = {
    ...(colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme),
    colors: ComponentColors[colorScheme ?? 'light']
  };

  // Set up the auth context and render our layout inside of it.
  return (
    <SafeAreaProvider>
      <TokenProvider>
        <PaperProvider theme={paperTheme}>
          <SseProvider>
            <Slot />
          </SseProvider>
        </PaperProvider>
      </TokenProvider>
    </SafeAreaProvider>
  );
}
