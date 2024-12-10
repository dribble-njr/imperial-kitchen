import { useColorScheme } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useStorageState } from './useStorageState';
import { Setting } from '@/types';
import { getUserLanguage } from '@/locales/i18n';
import { useCallback, useEffect } from 'react';

const DEFAULT_SETTING: Setting = {
  theme: 'auto',
  language: 'auto',
  color: 'default'
};

export function useAppSettings() {
  const colorScheme = useColorScheme();
  const [[isSettingLoading, setting], setSetting] = useStorageState<Setting>('app-settings');
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
    [setSetting]
  );

  const currentTheme = setting?.theme || 'auto';
  const effectiveColorScheme = currentTheme === 'auto' ? colorScheme : currentTheme;

  return {
    isSettingLoading,
    setting,
    updateSetting,
    effectiveColorScheme,
    currentColor: setting?.color || 'default'
  };
}
