import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import Surface from './Surface';
import SafeAreaSurface from './SafeAreaSurface';

const HEADER_HEIGHT = 150;

type Props = PropsWithChildren<{
  variant?: 'full' | 'default';
  headerImage?: ReactElement;
  headerBackgroundColor?: string;
  contentContainerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
}>;

/**
 * When scroll quickly with scrollView, it will show white background, so we need to use Animated.ScrollView
 */
export default function ParallaxScrollView({
  variant = 'default',
  children,
  headerImage,
  headerBackgroundColor,
  contentContainerStyle,
  contentStyle
}: Props) {
  return (
    <SafeAreaSurface variant={variant} style={{ position: 'relative' }}>
      {headerImage && (
        <Animated.View style={[styles.header, { backgroundColor: headerBackgroundColor }]}>{headerImage}</Animated.View>
      )}

      <Animated.ScrollView scrollEventThrottle={16} style={contentContainerStyle}>
        <Surface style={[styles.content, contentStyle]} elevation={0} testID="parallax-scroll-view-content">
          {children}
        </Surface>
      </Animated.ScrollView>
    </SafeAreaSurface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: HEADER_HEIGHT,
    zIndex: 2
  },
  content: {
    flex: 1,
    padding: 24,
    gap: 16,
    borderRadius: 20
  }
});
