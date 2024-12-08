import { ViewStyle } from 'react-native';
import { Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * A Surface that has a SafeAreaView around it.
 * This is useful for pages that need to fill the entire screen.
 * Use additional Surface components to adapt status bar background color.
 */
export default function SafeAreaSurface({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return (
    <Surface style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Surface style={style}>{children}</Surface>
      </SafeAreaView>
    </Surface>
  );
}
