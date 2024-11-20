import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { type ComponentProps } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
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

const renderTab = (config: TabConfig) => (
  <Tabs.Screen
    key={config.name}
    name={config.name}
    options={{
      title: config.title,
      tabBarIcon: ({ color, focused }) => (
        <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
          <TabBarIcon name={focused ? config.icon : config.activeIcon} color={color} style={styles.icon} />
          {focused && (
            <View style={styles.labelContainer}>
              <Text style={[styles.label, { color }]}>{config.label}</Text>
            </View>
          )}
        </View>
      )
    }}
  />
);

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.item,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false
      }}
    >
      {TAB_CONFIG.map(renderTab)}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 65,
    backgroundColor: 'rgba(249, 249, 249, 1)',
    borderTopColor: '#f0f0f0',
    elevation: 8,
    paddingHorizontal: 10,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0
  },
  icon: {
    // marginTop: 3
  },
  item: {
    margin: 4
  },
  labelContainer: {
    marginLeft: 8,
    paddingTop: 4
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 14,

    paddingVertical: 12,
    paddingHorizontal: 18
  },
  activeIconContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)'
  }
});
