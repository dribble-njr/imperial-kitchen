import { Surface } from '@/components/common';
import Themes from '@/constants/Themes';
import { useAppSetting } from '@/context/AppSettingContext';
import { ToastProvider } from '@/context/ToastContext';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { DarkTheme as NavDarkTheme, DefaultTheme as NavLightTheme, ThemeProvider } from '@react-navigation/native';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { adaptNavigationTheme, PaperProvider } from 'react-native-paper';

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
        <ToastProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
              <Surface style={{ flex: 1 }} testID="root-surface">
                <StatusBar style={statusBarStyle} />
                <Slot />
              </Surface>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </ToastProvider>
      </ThemeProvider>
    </PaperProvider>
  );
}
