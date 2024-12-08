import { useRef, useState } from 'react';
import { StyleSheet, ViewStyle, LayoutChangeEvent } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withSpring
} from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import Surface from './Surface';

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
  const [containerWidth, setContainerWidth] = useState(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    }
  });

  return (
    <Surface style={[styles.container, style]} onLayout={handleLayout}>
      <Animated.FlatList
        ref={flatListRef}
        data={images}
        renderItem={({ item }) => (
          <Surface style={[styles.imageContainer, { width: containerWidth }]}>
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
        {containerWidth > 0 &&
          images.map((_, index) => (
            <Indicator key={index} index={index} scrollX={scrollX} containerWidth={containerWidth} />
          ))}
      </Surface>
    </Surface>
  );
}

function Indicator({
  index,
  scrollX,
  containerWidth
}: {
  index: number;
  scrollX: SharedValue<number>;
  containerWidth: number;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    const width = interpolate(
      scrollX.value,
      [(index - 1) * containerWidth, index * containerWidth, (index + 1) * containerWidth],
      [INDICATOR_WIDTH, ACTIVE_INDICATOR_WIDTH, INDICATOR_WIDTH],
      'clamp'
    );

    const opacity = interpolate(
      scrollX.value,
      [(index - 1) * containerWidth, index * containerWidth, (index + 1) * containerWidth],
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
    overflow: 'hidden',
    gap: 10
  },
  flatList: {
    borderRadius: 8
  },
  imageContainer: {
    flex: 1
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 8
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: INDICATOR_PADDING
  },
  indicator: {
    height: 4,
    backgroundColor: 'white',
    borderRadius: 2
  }
});
