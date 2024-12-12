import { TokenProvider } from '@/context/AuthContext';
import { SSEProvider } from '@/context/SSEContext';
import '@/locales/i18n';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { DarkTheme as NavDarkTheme, DefaultTheme as NavLightTheme, ThemeProvider } from '@react-navigation/native';
import { adaptNavigationTheme, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../global.css';
import { Surface } from '@/components';
import Themes from '@/constants/Themes';
import { useAppSetting } from '@/hooks/useAppSetting';

export default function Root() {
  const { isSettingLoading, effectiveColorScheme, currentColor } = useAppSetting();

  if (isSettingLoading) {
    return null;
  }

  const paperTheme = Themes[effectiveColorScheme ?? 'light'][currentColor];

  const { DarkTheme, LightTheme } = adaptNavigationTheme({
    reactNavigationDark: NavDarkTheme,
    reactNavigationLight: NavLightTheme,
    materialDark: Themes.dark.default,
    materialLight: Themes.light.default
  });

  const statusBarStyle = effectiveColorScheme === 'dark' ? 'light' : 'dark';

  return (
    <SafeAreaProvider>
      <TokenProvider>
        <PaperProvider theme={paperTheme}>
          <ThemeProvider value={effectiveColorScheme === 'dark' ? DarkTheme : LightTheme}>
            <SSEProvider>
              <Surface style={{ flex: 1 }}>
                <StatusBar style={statusBarStyle} />
                <Slot />
              </Surface>
            </SSEProvider>
          </ThemeProvider>
        </PaperProvider>
      </TokenProvider>
    </SafeAreaProvider>
  );
}
