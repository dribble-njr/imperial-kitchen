import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { type ComponentProps } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

type IconName = ComponentProps<typeof Ionicons>['name'];

interface TabConfig {
  name: string;
  title: string;
  label: string;
  icon: IconName;
  activeIcon: IconName;
}

// Tab 配置
const TAB_CONFIG: TabConfig[] = [
  {
    name: 'index',
    title: 'Home',
    label: '首页',
    icon: 'home',
    activeIcon: 'home-outline'
  },
  {
    name: 'explore',
    title: 'Explore',
    label: '我的',
    icon: 'code-slash',
    activeIcon: 'code-slash-outline'
  }
];

const TabBarLabel = ({ focused, color, label }: { focused: boolean; color: string; label: string }) => {
  return (
    <Text style={[styles.label, { color, fontSize: focused ? 14 : 13, fontWeight: focused ? 'bold' : 'normal' }]}>
      {label}
    </Text>
  );
};

export default function TabLayout() {
  const theme = useTheme();

  const renderTab = (config: TabConfig) => (
    <Tabs.Screen
      key={config.name}
      name={config.name}
      options={{
        title: config.title,
        tabBarIcon: ({ color, focused }) => (
          <TabBarIcon name={focused ? config.icon : config.activeIcon} color={color} style={styles.icon} />
        ),
        tabBarLabel: ({ focused, color }) => <TabBarLabel focused={focused} color={color} label={config.label} />
      }}
    />
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.label,
        tabBarItemStyle: styles.item,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: true,
        tabBarLabelPosition: 'below-icon'
      }}
    >
      {TAB_CONFIG.map(renderTab)}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 65,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    elevation: 8,
    paddingHorizontal: 10,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0
  },
  icon: {
    marginTop: 3
  },
  item: {
    padding: 4
  },
  label: {
    textAlign: 'center',
    marginBottom: 4
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4
  }
});
