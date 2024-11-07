import { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import { routesConfig } from './routes';

export const CustomTabBar = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState(routesConfig);

  const renderScene = BottomNavigation.SceneMap(
    Object.fromEntries(routesConfig.map((route) => [route.key, route.render]))
  );

  return <BottomNavigation navigationState={{ index, routes }} onIndexChange={setIndex} renderScene={renderScene} />;
};
