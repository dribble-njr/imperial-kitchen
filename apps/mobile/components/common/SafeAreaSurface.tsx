import { ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Surface from './Surface';

/**
 * A Surface that has a SafeAreaView around it.
 * This is useful for pages that need to fill the entire screen.
 * Use additional Surface components to adapt status bar background color.
 */
export default function SafeAreaSurface({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return (
    <Surface style={{ flex: 1 }} testID="safe-area-surface">
      <SafeAreaView style={{ flex: 1 }} testID="safe-area-view">
        <Surface style={[style, { flex: 1 }]} testID="safe-area-surface-content">
          {children}
        </Surface>
      </SafeAreaView>
    </Surface>
  );
}
