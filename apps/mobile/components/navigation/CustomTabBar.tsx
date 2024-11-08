import { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import { routesConfig } from './routes';
import { useTranslation } from 'react-i18next';

export const CustomTabBar = () => {
  const [index, setIndex] = useState(0);
  const { t } = useTranslation();
  const [routes] = useState(() => routesConfig.map((route) => ({ ...route, title: t(route.title) })));

  const renderScene = BottomNavigation.SceneMap(
    Object.fromEntries(routesConfig.map((route) => [route.key, route.render]))
  );

  return <BottomNavigation navigationState={{ index, routes }} onIndexChange={setIndex} renderScene={renderScene} />;
};
