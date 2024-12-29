import { ColorName } from '@/constants/Colors';
import { useStorageState } from '@/hooks/useStorageState';
import { getUserLanguage } from '@/locales/i18n';
import { Setting } from '@/types';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ColorSchemeName, useColorScheme } from 'react-native';

const DEFAULT_SETTING: Setting = {
  theme: 'auto',
  language: 'auto',
  color: 'default'
};

const AppSettingContext = createContext<{
  isSettingLoading: boolean;
  setting: Setting | null;
  updateSetting: (newSetting: Partial<Setting>) => void;
  effectiveColorScheme: ColorSchemeName;
  currentColor: ColorName;
}>({
  isSettingLoading: false,
  setting: DEFAULT_SETTING,
  updateSetting: () => null,
  effectiveColorScheme: 'light',
  currentColor: 'default'
});

export function useAppSetting() {
  const value = useContext(AppSettingContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useAppSetting must be wrapped in a <AppSettingProvider />');
    }
  }
  return value;
}

export function AppSettingProvider(props: PropsWithChildren) {
  const colorScheme = useColorScheme();
  const [[isSettingLoading, setting], setSetting] = useStorageState<Setting>('app-setting');
  const { i18n } = useTranslation();

  useEffect(() => {
    if (!isSettingLoading && !setting) {
      setSetting(DEFAULT_SETTING);
    }
  }, [isSettingLoading, setting]);

  useEffect(() => {
    if (setting?.language) {
      const targetLang = setting.language === 'auto' ? getUserLanguage() : setting.language;
      if (i18n.language !== targetLang) {
        i18n.changeLanguage(targetLang);
      }
    }
  }, [setting?.language, i18n]);

  const updateSetting = useCallback(
    (newSetting: Partial<Setting>) => {
      setSetting({ ...setting, ...newSetting } as Setting);
    },
    [setSetting, setting]
  );

  const currentTheme = setting?.theme || 'auto';
  const effectiveColorScheme = currentTheme === 'auto' ? colorScheme : currentTheme;

  return (
    <AppSettingContext.Provider
      value={{
        isSettingLoading,
        setting,
        updateSetting,
        effectiveColorScheme,
        currentColor: setting?.color || 'default'
      }}
    >
      {props.children}
    </AppSettingContext.Provider>
  );
}
