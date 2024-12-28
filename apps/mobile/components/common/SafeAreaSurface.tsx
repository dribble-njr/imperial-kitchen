import { ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Surface from './Surface';

/**
 * A Surface that has a SafeAreaView around it.
 * This is useful for pages that need to fill the entire screen.
 * Use additional Surface components to adapt status bar background color.
 */
export default function SafeAreaSurface({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  const insets = useSafeAreaInsets();

  return (
    <Surface style={{ flex: 1, paddingTop: insets.top }} testID="safe-area-surface">
      <Surface style={[style]} testID="safe-area-surface-content">
        {children}
      </Surface>
    </Surface>
  );
}
