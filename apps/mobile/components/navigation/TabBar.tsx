import { useThemeColor } from '@/hooks/useThemeColor';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { CommonActions } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { BottomNavigation, Surface } from 'react-native-paper';

const TabBar = (props: BottomTabBarProps) => {
  const themeColor = useThemeColor();
  const router = useRouter();

  return (
    <BottomNavigation.Bar
      shifting
      navigationState={props.state}
      safeAreaInsets={props.insets}
      onTabPress={({ route, preventDefault }) => {
        if (route.name === 'new') {
          preventDefault();
          router.push('/(app)/(new)/new');
          return;
        }

        const event = props.navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true
        });

        if (event.defaultPrevented) {
          preventDefault();
        } else {
          props.navigation.dispatch({
            ...CommonActions.navigate(route.name, route.params),
            target: props.state.key
          });
        }
      }}
      renderIcon={({ route, focused, color }) => {
        const { options } = props.descriptors[route.key];

        if (route.name === 'new') {
          return (
            <Surface
              style={{
                width: 50,
                height: 50,
                borderRadius: 32,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: '50%',
                transform: [{ translateY: '-50%' }],
                backgroundColor: themeColor.primary
              }}
            >
              <MaterialCommunityIcons name="plus" size={24} color="white" />
            </Surface>
          );
        }

        if (options.tabBarIcon) {
          return options.tabBarIcon({ focused, color, size: 24 });
        }

        return null;
      }}
      // When the keyboard is awakened, the bottom navigation bar will be hidden and there will be a white flash.
      // https://github.com/react-navigation/react-navigation/issues/7447#issuecomment-541366297
      keyboardHidesNavigationBar={false}
      getLabelText={({ route }) => {
        const { options } = props.descriptors[route.key];

        if (route.name === 'new') {
          return '';
        }

        const label =
          options.tabBarLabel !== undefined
            ? typeof options.tabBarLabel === 'string'
              ? options.tabBarLabel
              : route.name
            : options.title !== undefined
              ? options.title
              : route.name;

        return label;
      }}
    />
  );
};

export default TabBar;
