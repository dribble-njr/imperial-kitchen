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
import { useStorageState } from '@/hooks/useStorageState';
import { Setting } from '@/types';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getUserLanguage } from '@/locales/i18n';

const DEFAULT_SETTING: Setting = {
  theme: 'auto',
  language: 'auto',
  color: 'default'
};

export default function Root() {
  const colorScheme = useColorScheme();
  const [[isLoading, setting], setSetting] = useStorageState<Setting>('app-settings');
  const { i18n } = useTranslation();

  useEffect(() => {
    if (!isLoading && !setting) {
      setSetting(DEFAULT_SETTING);
    }
  }, [isLoading, setting]);

  useEffect(() => {
    if (setting?.language) {
      const targetLang = setting.language === 'auto' ? getUserLanguage() : setting.language;

      if (i18n.language !== targetLang) {
        i18n.changeLanguage(targetLang);
      }
    }
  }, [setting?.language, i18n]);

  if (isLoading) {
    return null;
  }

  const currentTheme = setting?.theme || 'auto';
  const effectiveColorScheme = currentTheme === 'auto' ? colorScheme : currentTheme;

  const paperTheme = Themes[effectiveColorScheme ?? 'light'][setting?.color || 'default'];

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
