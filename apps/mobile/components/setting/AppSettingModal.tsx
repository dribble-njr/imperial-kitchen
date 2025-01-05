import { Menu } from 'react-native-paper';
import { Languages, Language, Theme } from '@/types';
import { useTranslation } from 'react-i18next';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Modal } from '@/components/common';
import { Icon } from 'react-native-paper';
import { Colors, ColorName } from '@/constants/Colors';
import { useAppSetting } from '@/context/AppSettingContext';

interface AppSettingModalProps {
  type: 'language' | 'theme' | 'color';
  visible: boolean;
  onDismiss: () => void;
  currentValue?: string;
  onSelect: (value: Language | Theme | ColorName) => void;
}

export function AppSettingModal({ type, visible, onDismiss, currentValue, onSelect }: AppSettingModalProps) {
  const { t } = useTranslation();
  const colors = useThemeColor();
  const { effectiveColorScheme } = useAppSetting();

  const renderContent = (type: 'language' | 'theme' | 'color') => {
    switch (type) {
      case 'language':
        return (
          <>
            <Menu.Item
              title="System"
              trailingIcon={currentValue === 'auto' ? 'check' : undefined}
              onPress={() => {
                onSelect('auto' as Language);
                onDismiss();
              }}
            />
            {Object.entries(Languages).map((lang) => (
              <Menu.Item
                key={lang[0]}
                title={`${lang[0]} / ${lang[1]}`}
                trailingIcon={currentValue === lang[0] ? 'check' : undefined}
                onPress={() => {
                  onSelect(lang[0] as Language);
                  onDismiss();
                }}
              />
            ))}
          </>
        );
      case 'theme':
        return (
          <>
            <Menu.Item
              title={t('system')}
              leadingIcon="theme-light-dark"
              trailingIcon={currentValue === 'auto' ? 'check' : undefined}
              onPress={() => {
                onSelect('auto' as Theme);
                onDismiss();
              }}
            />
            <Menu.Item
              title={t('lightMode')}
              leadingIcon="weather-sunny"
              trailingIcon={currentValue === 'light' ? 'check' : undefined}
              onPress={() => {
                onSelect('light' as Theme);
                onDismiss();
              }}
            />
            <Menu.Item
              title={t('darkMode')}
              leadingIcon="weather-night"
              trailingIcon={currentValue === 'dark' ? 'check' : undefined}
              onPress={() => {
                onSelect('dark' as Theme);
                onDismiss();
              }}
            />
          </>
        );
      case 'color':
        return (
          <>
            {Object.keys(Colors.light).map((color) => (
              <Menu.Item
                key={color}
                leadingIcon={() => (
                  <Icon
                    size={24}
                    source="palette"
                    color={
                      color !== currentValue
                        ? Colors[effectiveColorScheme!][color as ColorName].primary
                        : colors.onPrimary
                    }
                  />
                )}
                trailingIcon={currentValue === color ? 'check' : undefined}
                title={t(color)}
                onPress={() => {
                  onSelect(color as ColorName);
                  onDismiss();
                }}
              />
            ))}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Modal visible={visible} onDismiss={onDismiss}>
      {renderContent(type)}
    </Modal>
  );
}
