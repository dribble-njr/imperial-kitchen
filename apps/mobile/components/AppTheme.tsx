import { Surface } from '@/components/common';
import Themes from '@/constants/Themes';
import { useAppSetting } from '@/context/AppSettingContext';
import { DarkTheme as NavDarkTheme, DefaultTheme as NavLightTheme, ThemeProvider } from '@react-navigation/native';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { adaptNavigationTheme, PaperProvider } from 'react-native-paper';
import { SSEProvider } from '@/context/SSEContext';

export function AppTheme() {
  const { isSettingLoading, effectiveColorScheme, currentColor, setting } = useAppSetting();

  if (isSettingLoading) {
    return null;
  }

  console.log(effectiveColorScheme, currentColor, 'AppTheme', setting);
  const paperTheme = Themes[effectiveColorScheme ?? 'light'][currentColor];

  const { DarkTheme, LightTheme } = adaptNavigationTheme({
    reactNavigationDark: NavDarkTheme,
    reactNavigationLight: NavLightTheme,
    materialDark: Themes.dark.default,
    materialLight: Themes.light.default
  });

  const statusBarStyle = effectiveColorScheme === 'dark' ? 'light' : 'dark';

  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={effectiveColorScheme === 'dark' ? DarkTheme : LightTheme}>
        <SSEProvider>
          <Surface style={{ flex: 1 }} testID="root-surface">
            <StatusBar style={statusBarStyle} />
            <Slot />
          </Surface>
        </SSEProvider>
      </ThemeProvider>
    </PaperProvider>
  );
}
