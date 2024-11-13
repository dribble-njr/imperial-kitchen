import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  safeArea?: boolean;
};

export function ThemedView({ style, lightColor, darkColor, safeArea = false, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        style,
        { backgroundColor, ...(safeArea ? { paddingTop: insets.top, paddingBottom: insets.bottom } : {}) }
      ]}
      {...otherProps}
    />
  );
}
