import { FC } from 'react';
import Animated, { useAnimatedRef } from 'react-native-reanimated';
import { Category } from '@imperial-kitchen/types';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

interface FoodListProps {
  categories: Category[];
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

const FoodList: FC<FoodListProps> = ({ categories, onScroll }) => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  return (
    <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16} onScroll={onScroll}>
      <ThemedView>
        {categories.map((category) => {
          return (
            <>
              <ThemedText key={category.name}>{category.name}</ThemedText>
              {category.goods?.map((food) => <ThemedText key={food.id}>{food.name}</ThemedText>)}
            </>
          );
        })}
      </ThemedView>
    </Animated.ScrollView>
  );
};

export default FoodList;
