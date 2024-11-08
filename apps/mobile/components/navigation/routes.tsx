import { HomePage } from '@/pages/home';
import { ProfilePage } from '@/pages/profile';
import { ReactNode } from 'react';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';

export const routesConfig: {
  key: string;
  title: string;
  render: () => ReactNode;
  focusedIcon: IconSource;
  unfocusedIcon: IconSource;
}[] = [
  { key: 'home', title: 'home', render: () => <HomePage />, focusedIcon: 'home', unfocusedIcon: 'home-outline' },
  { key: 'my', title: 'profile', render: () => <ProfilePage />, focusedIcon: 'camera', unfocusedIcon: 'camera-outline' }
];
