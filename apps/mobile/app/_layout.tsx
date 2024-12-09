import { ComponentColors } from '@/constants/Colors';
import { TokenProvider } from '@/context/AuthContext';
import { SSEProvider } from '@/context/SSEContext';
import '@/locales/i18n';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../global.css';
import Surface from '@/components/Surface';

export default function Root() {
  const colorScheme = useColorScheme();

  const paperTheme = {
    ...(colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme),
    colors: ComponentColors[colorScheme ?? 'light']
  };

  return (
    <SafeAreaProvider>
      <TokenProvider>
        <PaperProvider theme={paperTheme}>
          <SSEProvider>
            <Surface style={{ flex: 1 }}>
              <StatusBar style="auto" />
              <Slot />
            </Surface>
          </SSEProvider>
        </PaperProvider>
      </TokenProvider>
    </SafeAreaProvider>
  );
}
