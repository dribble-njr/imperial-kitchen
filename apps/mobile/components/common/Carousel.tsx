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
import { useThemeColor } from '@/hooks/useThemeColor';

const INDICATOR_WIDTH = 16;
const INDICATOR_PADDING = 3;
const ACTIVE_INDICATOR_WIDTH = 24;

interface CarouselProps {
  images: string[] | React.ReactNode[];
  style?: ViewStyle;
}

export default function Carousel({ images, style }: CarouselProps) {
  const scrollX = useSharedValue(0);
  const flatListRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setContainerWidth(width);
    setContainerHeight(height);
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
          <Surface style={[styles.itemContainer, { width: containerWidth, height: containerHeight }]}>
            {typeof item === 'string' ? (
              <Surface style={styles.imageContainer}>
                <Animated.Image source={{ uri: item }} style={styles.image} />
              </Surface>
            ) : (
              item
            )}
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
  const colors = useThemeColor();
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
      [0.3, 1, 0.3],
      'clamp'
    );

    return {
      width: withSpring(width),
      opacity: withSpring(opacity)
    };
  });

  return <Animated.View style={[styles.indicator, animatedStyle, { backgroundColor: colors.primary }]} />;
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
  itemContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    flex: 1,
    width: '100%'
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
    borderRadius: 2
  }
});
