import RNCarousel from 'react-native-reanimated-carousel';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import Surface from './Surface';
import { useThemeColor } from '@/hooks/useThemeColor';

interface CarouselProps<T> extends Omit<React.ComponentProps<typeof RNCarousel<T>>, 'renderItem'> {
  data: T[];
  renderItem: (item: T) => React.ReactElement;
}

export default function Carousel<T>({
  data,
  renderItem,
  loop = true,
  autoPlay = true,
  width = Dimensions.get('window').width - 64,
  vertical = false as const,
  ...rest
}: CarouselProps<T>) {
  const progress = useSharedValue<number>(0);
  const colors = useThemeColor();

  const renderPaginationDot = (index: number) => {
    const animatedStyle = useAnimatedStyle(() => {
      const distance = (progress.value - index + data.length) % data.length;
      const isActive = distance < 0.5 || distance > data.length - 0.5;

      return {
        opacity: withSpring(isActive ? 1 : 0.5, {
          mass: 0.5,
          damping: 15,
          stiffness: 120
        }),
        transform: [
          {
            scale: withSpring(isActive ? 1.2 : 1, {
              mass: 0.5,
              damping: 15,
              stiffness: 120
            })
          }
        ]
      };
    });

    return (
      <Animated.View key={index} style={[styles.paginationDot, animatedStyle, { backgroundColor: colors.primary }]} />
    );
  };

  return (
    <View style={styles.container}>
      <RNCarousel
        loop={loop}
        width={width}
        autoPlay={autoPlay}
        data={data}
        vertical={vertical}
        scrollAnimationDuration={2000}
        renderItem={({ item }: { item: T }) => <View style={styles.itemContainer}>{renderItem(item)}</View>}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onProgressChange={(_: any, absoluteProgress: number) => {
          progress.value = absoluteProgress;
        }}
        {...rest}
      />

      <Surface
        elevation={0}
        style={[styles.paginationContainer, vertical ? styles.verticalPagination : styles.horizontalPagination]}
      >
        {data.map((_, index) => renderPaginationDot(index))}
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  paginationContainer: {
    position: 'absolute',
    gap: 8
  },
  verticalPagination: {
    right: 16,
    top: '50%',
    transform: [{ translateY: '-50%' }],
    flexDirection: 'column'
  },
  horizontalPagination: {
    bottom: 16,
    left: '50%',
    transform: [{ translateX: '-50%' }],
    flexDirection: 'row'
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3
  }
});
