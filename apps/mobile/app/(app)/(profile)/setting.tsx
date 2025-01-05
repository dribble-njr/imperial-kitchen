import { Card, List, Text } from 'react-native-paper';
import { ListItem, ParallaxScrollView } from '@/components/common';
import { AppSettingModal } from '@/components/setting/AppSettingModal';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useTranslation } from 'react-i18next';
import { useAppSetting } from '@/context/AppSettingContext';
import { ColorName } from '@/constants/Colors';

export default function Setting() {
  const colors = useThemeColor();
  const { t } = useTranslation();
  const { setting, updateSetting } = useAppSetting();

  const [display, setDisplay] = useState({
    color: false,
    language: false,
    theme: false
  });

  const { signOut } = useAuth();

  return (
    <ParallaxScrollView variant="full">
      <Text>App 设置</Text>

      <Card mode="contained">
        <ListItem
          title={t('profile.setting.language')}
          left={(props) => <List.Icon {...props} icon="translate" />}
          rightText={setting?.language}
          onPress={() => setDisplay({ ...display, language: true })}
        />

        <ListItem
          title={t('profile.setting.theme')}
          left={(props) => (
            <List.Icon
              {...props}
              icon={
                setting?.theme === 'auto'
                  ? 'theme-light-dark'
                  : setting?.theme === 'light'
                    ? 'weather-sunny'
                    : 'weather-night'
              }
            />
          )}
          onPress={() => setDisplay({ ...display, theme: true })}
        />

        <ListItem
          title={t('profile.setting.color')}
          left={(props) => <List.Icon {...props} icon="palette-swatch-variant" color={colors.primary} />}
          onPress={() => setDisplay({ ...display, color: true })}
        />
      </Card>

      <AppSettingModal
        type="language"
        visible={display.language}
        currentValue={setting?.language}
        onDismiss={() => setDisplay({ ...display, language: false })}
        onSelect={(value) => updateSetting({ language: value })}
      />

      <AppSettingModal
        type="theme"
        visible={display.theme}
        currentValue={setting?.theme}
        onDismiss={() => setDisplay({ ...display, theme: false })}
        onSelect={(value) => updateSetting({ theme: value as 'light' | 'dark' | 'auto' })}
      />

      <AppSettingModal
        type="color"
        visible={display.color}
        currentValue={setting?.color}
        onDismiss={() => setDisplay({ ...display, color: false })}
        onSelect={(value) => updateSetting({ color: value as ColorName })}
      />

      <Card mode="contained">
        <ListItem
          title={t('profile.setting.signOut')}
          titleStyle={{ color: colors.error }}
          left={(props) => <List.Icon {...props} icon="logout" />}
          onPress={() => signOut()}
          hasRightIcon={false}
        />
      </Card>
    </ParallaxScrollView>
  );
}
