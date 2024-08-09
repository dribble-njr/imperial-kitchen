import { FC } from 'react';
import Animated, { useAnimatedRef } from 'react-native-reanimated';
import { NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Image } from 'react-native';
import { Category } from '@imperial-kitchen/types';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';

interface FoodListProps {
  categories: Category[];
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

const FoodList: FC<FoodListProps> = ({ categories, onScroll }) => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  return (
    <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16} onScroll={onScroll}>
      {categories.map((category) => {
        return (
          <ThemedView style={styles.foodContainer}>
            <ThemedText key={category.name}>{category.name}</ThemedText>

            {category.goods?.map((food) => {
              console.log(food, 'food');
              return (
                <ThemedView key={food.id} style={styles.food}>
                  <Image source={{ uri: food.image }} style={styles.foodImage} />

                  <ThemedView style={styles.textContainer}>
                    <ThemedText>{food.name}</ThemedText>
                    <ThemedText type="secondary">{food.description}</ThemedText>
                  </ThemedView>
                </ThemedView>
              );
            })}
          </ThemedView>
        );
      })}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  foodContainer: {
    marginBottom: 16
  },
  food: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  foodImage: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 5
  },
  textContainer: {
    flex: 1
  },
  foodDescription: {
    color: '#6e6e6e'
  }
});

export default FoodList;
