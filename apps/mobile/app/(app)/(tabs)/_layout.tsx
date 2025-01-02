import { TabBar } from '@/components/navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { type ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

interface TabConfig {
  name: string;
  locale: string;
  icon: IconName;
  activeIcon: IconName;
}

const TAB_CONFIG: TabConfig[] = [
  {
    name: 'index',
    locale: 'home',
    icon: 'home-outline',
    activeIcon: 'home'
  },
  {
    name: 'recipe',
    locale: 'recipe',
    icon: 'flask-outline',
    activeIcon: 'flask'
  },
  {
    name: 'new',
    locale: 'new',
    icon: 'plus-outline',
    activeIcon: 'plus'
  },
  {
    name: 'message',
    locale: 'message',
    icon: 'chat-outline',
    activeIcon: 'chat'
  },
  {
    name: 'profile',
    locale: 'profile',
    icon: 'account-outline',
    activeIcon: 'account'
  }
];

const renderTabItem = (config: TabConfig) => {
  const { t } = useTranslation();

  return (
    <Tabs.Screen
      key={config.name}
      name={config.name}
      options={{
        title: t(`${config.locale}.title`),
        tabBarIcon: ({ focused, color, size }) => {
          return <MaterialCommunityIcons size={size} name={focused ? config.activeIcon : config.icon} color={color} />;
        }
      }}
    />
  );
};

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false
      }}
    >
      {TAB_CONFIG.map(renderTabItem)}
    </Tabs>
  );
}
