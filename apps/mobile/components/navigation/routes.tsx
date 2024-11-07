import { HomePage } from '@/pages/home';
import { MyPage } from '@/pages/my';
import { ReactNode } from 'react';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';

export const routesConfig: {
  key: string;
  title: string;
  render: () => ReactNode;
  focusedIcon: IconSource;
  unfocusedIcon: IconSource;
}[] = [
  { key: 'home', title: '首页', render: () => <HomePage />, focusedIcon: 'home', unfocusedIcon: 'home-outline' },
  { key: 'my', title: '我的', render: () => <MyPage />, focusedIcon: 'camera', unfocusedIcon: 'camera-outline' }
];
