import { useRef } from 'react';
import { StyleSheet, Dimensions, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withSpring
} from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import Surface from './Surface';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const INDICATOR_WIDTH = 16;
const INDICATOR_PADDING = 3;
const ACTIVE_INDICATOR_WIDTH = 24;

interface CarouselProps {
  images: string[];
  style?: ViewStyle;
}

export default function Carousel({ images, style }: CarouselProps) {
  const scrollX = useSharedValue(0);
  const flatListRef = useRef(null);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    }
  });

  return (
    <Surface style={[styles.container, style]}>
      <Animated.FlatList
        ref={flatListRef}
        data={images}
        renderItem={({ item }) => (
          <Surface style={styles.imageContainer}>
            <Animated.Image source={{ uri: item }} style={styles.image} />
          </Surface>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        style={styles.flatList}
      />

      <Surface style={styles.indicatorContainer} elevation={0}>
        {images.map((_, index) => (
          <Indicator key={index} index={index} scrollX={scrollX} />
        ))}
      </Surface>
    </Surface>
  );
}

function Indicator({ index, scrollX }: { index: number; scrollX: SharedValue<number> }) {
  const animatedStyle = useAnimatedStyle(() => {
    const width = interpolate(
      scrollX.value,
      [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
      [INDICATOR_WIDTH, ACTIVE_INDICATOR_WIDTH, INDICATOR_WIDTH],
      'clamp'
    );

    const opacity = interpolate(
      scrollX.value,
      [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
      [0.5, 1, 0.5],
      'clamp'
    );

    return {
      width: withSpring(width),
      opacity: withSpring(opacity)
    };
  });

  return <Animated.View style={[styles.indicator, animatedStyle]} />;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 3 / 4,
    overflow: 'hidden',
    flex: 1
  },
  flatList: {
    flex: 1,
    borderRadius: 8
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    aspectRatio: 3 / 4
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8
  },
  indicatorContainer: {
    flexDirection: 'row',
    // position: 'absolute',
    // bottom: 16,
    alignSelf: 'center',
    gap: INDICATOR_PADDING
  },
  indicator: {
    height: 4,
    backgroundColor: 'white',
    borderRadius: 2
  }
});
