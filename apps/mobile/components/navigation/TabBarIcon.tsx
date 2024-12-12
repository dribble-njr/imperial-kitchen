// Icon from https://ionic.io/ionicons

import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

const TabBarIcon = ({ style, ...rest }: IconProps<ComponentProps<typeof Ionicons>['name']>) => (
  <Ionicons size={28} style={style} {...rest} />
);

export default TabBarIcon;
