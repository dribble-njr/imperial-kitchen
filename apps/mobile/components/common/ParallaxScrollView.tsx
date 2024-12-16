import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';
import Surface from './Surface';
import SafeAreaSurface from './SafeAreaSurface';

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  headerImage?: ReactElement;
  headerBackgroundColor?: { dark: string; light: string };
}>;

/**
 * When scroll quickly with scrollView, it will show white background, so we need to use Animated.ScrollView
 */
export default function ParallaxScrollView({ children, headerImage, headerBackgroundColor }: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          )
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1])
        }
      ]
    };
  });

  return (
    <SafeAreaSurface>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        {headerImage && (
          <Animated.View
            style={[styles.header, { backgroundColor: headerBackgroundColor?.[colorScheme] }, headerAnimatedStyle]}
          >
            {headerImage}
          </Animated.View>
        )}
        <Surface style={styles.content} elevation={0} testID="parallax-scroll-view-content">
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
    height: 200,
    overflow: 'hidden'
  },
  content: {
    flex: 1,
    padding: 24,
    gap: 16,
    overflow: 'hidden',
    borderRadius: 20
  }
});
