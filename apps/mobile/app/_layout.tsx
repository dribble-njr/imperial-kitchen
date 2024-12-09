import { TokenProvider } from '@/context/AuthContext';
import { SSEProvider } from '@/context/SSEContext';
import '@/locales/i18n';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { DarkTheme as NavDarkTheme, DefaultTheme as NavLightTheme, ThemeProvider } from '@react-navigation/native';
import { adaptNavigationTheme, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../global.css';
import { Surface } from '@/components';
import Themes from '@/constants/Themes';

export default function Root() {
  const colorScheme = useColorScheme();

  const paperTheme = Themes[colorScheme ?? 'light'].default;

  const { DarkTheme, LightTheme } = adaptNavigationTheme({
    reactNavigationDark: NavDarkTheme,
    reactNavigationLight: NavLightTheme,
    materialDark: Themes.dark.default,
    materialLight: Themes.light.default
  });

  return (
    <SafeAreaProvider>
      <TokenProvider>
        <PaperProvider theme={paperTheme}>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : LightTheme}>
            <SSEProvider>
              <Surface style={{ flex: 1 }}>
                <StatusBar style="auto" />
                <Slot />
              </Surface>
            </SSEProvider>
          </ThemeProvider>
        </PaperProvider>
      </TokenProvider>
    </SafeAreaProvider>
  );
}
