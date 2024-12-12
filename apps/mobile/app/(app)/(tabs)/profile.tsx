import { Surface } from '@/components/common';
import { useColorScheme } from 'react-native';
import { List, Menu, IconButton, Snackbar, Icon } from 'react-native-paper';
import { Language, Languages } from '@/types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSetting } from '@/hooks/useAppSetting';
import { ColorName, Colors } from '@/constants/Colors';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const [message, setMessage] = useState({ visible: false, content: '' });

  const { setting, updateSetting } = useAppSetting();

  const [display, setDisplay] = useState({
    color: false,
    language: false,
    theme: false
  });

  const themeColors = Colors[setting?.theme === 'auto' ? colorScheme ?? 'light' : setting?.theme ?? 'light'];

  return (
    <Surface style={{ flex: 1 }}>
      <Surface elevation={0}>
        <List.AccordionGroup>
          <List.Accordion id="1" title={t('appearance')} left={(props) => <List.Icon {...props} icon="palette" />}>
            <List.Item
              title={t('language')}
              description={t('changeLanguage')}
              left={(props) => <List.Icon {...props} icon="translate" />}
              right={(props) => (
                <Menu
                  visible={display.language}
                  onDismiss={() => setDisplay({ ...display, language: false })}
                  anchor={
                    <IconButton {...props} icon="pencil" onPress={() => setDisplay({ ...display, language: true })} />
                  }
                >
                  <Menu.Item
                    title="System"
                    trailingIcon={setting?.language === 'auto' ? 'check' : undefined}
                    onPress={() => {
                      updateSetting({ language: 'auto' });
                      setDisplay({ ...display, language: false });
                    }}
                  />
                  {Object.entries(Languages).map((lang) => (
                    <Menu.Item
                      key={lang[0]}
                      title={`${lang[0]} / ${lang[1]}`}
                      trailingIcon={setting?.language === lang[0] ? 'check' : undefined}
                      onPress={() => {
                        updateSetting({
                          language: lang[0] as Language
                        });
                        setDisplay({ ...display, language: false });
                      }}
                    />
                  ))}
                </Menu>
              )}
            />
            <List.Item
              title={t('mode')}
              description={t('changeMode')}
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
              right={(props) => (
                <Menu
                  visible={display.theme}
                  onDismiss={() => setDisplay({ ...display, theme: false })}
                  anchor={
                    <IconButton {...props} icon="pencil" onPress={() => setDisplay({ ...display, theme: true })} />
                  }
                >
                  <Menu.Item
                    title={t('system')}
                    leadingIcon="theme-light-dark"
                    trailingIcon={setting?.theme === 'auto' ? 'check' : undefined}
                    onPress={() => {
                      updateSetting({ theme: 'auto' });
                      setDisplay({ ...display, theme: false });
                    }}
                  />
                  <Menu.Item
                    title={t('lightMode')}
                    leadingIcon="weather-sunny"
                    trailingIcon={setting?.theme === 'light' ? 'check' : undefined}
                    onPress={() => {
                      updateSetting({ theme: 'light' });
                      setDisplay({ ...display, theme: false });
                    }}
                  />
                  <Menu.Item
                    title={t('darkMode')}
                    leadingIcon="weather-night"
                    trailingIcon={setting?.theme === 'dark' ? 'check' : undefined}
                    onPress={() => {
                      updateSetting({ theme: 'dark' });
                      setDisplay({ ...display, theme: false });
                    }}
                  />
                </Menu>
              )}
            />
            <List.Item
              title={t('color')}
              description={t('changeColor')}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon="palette-swatch-variant"
                  color={
                    Colors[setting?.theme === 'auto' ? colorScheme ?? 'light' : setting?.theme ?? 'light'][
                      setting?.color ?? 'default'
                    ]?.primary
                  }
                />
              )}
              right={(props) => (
                <Menu
                  visible={display.color}
                  onDismiss={() => setDisplay({ ...display, color: false })}
                  anchor={
                    <IconButton {...props} icon="pencil" onPress={() => setDisplay({ ...display, color: true })} />
                  }
                >
                  {Object.keys(Colors.light).map((color) => (
                    <Surface
                      key={color}
                      elevation={0}
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center'
                      }}
                    >
                      <Surface
                        elevation={0}
                        style={{
                          padding: 4,
                          marginLeft: 8,
                          borderRadius: 16,
                          backgroundColor: color !== setting?.color ? undefined : themeColors[color]?.primary
                        }}
                      >
                        <Icon
                          size={24}
                          source="palette"
                          color={
                            color !== setting?.color
                              ? themeColors[color as ColorName]?.primary
                              : themeColors[color as ColorName].onPrimary
                          }
                        />
                      </Surface>

                      <Menu.Item
                        key={color}
                        title={t(color)}
                        onPress={() => {
                          updateSetting({
                            color: color as ColorName
                          });
                          setDisplay({ ...display, color: false });
                        }}
                      />
                    </Surface>
                  ))}
                </Menu>
              )}
            />
          </List.Accordion>
        </List.AccordionGroup>
      </Surface>

      <Snackbar
        visible={message.visible}
        onDismiss={() => setMessage({ ...message, visible: false })}
        onIconPress={() => setMessage({ ...message, visible: false })}
      >
        {message.content}
      </Snackbar>
    </Surface>
  );
}
