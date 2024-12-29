import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { CommonActions } from '@react-navigation/native';
import { BottomNavigation } from 'react-native-paper';

const TabBar = (props: BottomTabBarProps) => (
  <BottomNavigation.Bar
    shifting
    navigationState={props.state}
    safeAreaInsets={props.insets}
    onTabPress={({ route, preventDefault }) => {
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

export default TabBar;
