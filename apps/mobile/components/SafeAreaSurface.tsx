import type { SurfaceProps } from 'react-native-paper';
import { StyleSheet, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Surface from './Surface';

export default function SafeAreaSurface({ children, ...rest }: SurfaceProps) {
  const insets = useSafeAreaInsets();

  // PaperSurface style can't be combined with Surface style, so we need to flatten the styles
  // And we need to cast the style to ViewStyle to avoid type errors
  // So it can't pass animated styles
  const combinedStyle = StyleSheet.flatten<ViewStyle>([
    { paddingTop: insets.top, paddingBottom: insets.bottom },
    rest.style
  ]);

  return (
    <Surface {...rest} style={combinedStyle}>
      {children}
    </Surface>
  );
}
