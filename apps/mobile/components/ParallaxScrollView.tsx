import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Surface from './Surface';

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
  const insets = useSafeAreaInsets();

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
    <Surface style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        {headerImage && (
          <Animated.View
            style={[styles.header, { backgroundColor: headerBackgroundColor?.[colorScheme] }, headerAnimatedStyle]}
          >
            {headerImage}
          </Animated.View>
        )}
        <Surface style={styles.content} elevation={0}>
          {children}
        </Surface>
      </Animated.ScrollView>
    </Surface>
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
    padding: 32,
    gap: 16,
    overflow: 'hidden',
    borderRadius: 20
  }
});
