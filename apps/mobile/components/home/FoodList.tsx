import { FC } from 'react';
import Animated, { useAnimatedRef } from 'react-native-reanimated';
import { NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Image, Button } from 'react-native';
import { Category } from '@imperial-kitchen/types';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { useCart } from '@/context/CartContext';

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
          <ThemedView style={styles.foodContainer} key={category.name! + category.id}>
            <ThemedText>{category.name}</ThemedText>

            {category.goods?.map((food) => {
              console.log(food, 'food');
              return (
                <ThemedView key={food.name! + food.id} style={styles.food}>
                  <Image source={{ uri: food.image }} style={styles.foodImage} />

                  <ThemedView style={styles.textContainer}>
                    <ThemedText>{food.name}</ThemedText>
                    <ThemedText type="secondary">{food.description}</ThemedText>
                    <QuantityControl foodId={food.id!} />
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

const QuantityControl: FC<{ foodId: number }> = ({ foodId }) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const quantity = cart[foodId] || 0;

  return (
    <ThemedView style={styles.controlContainer}>
      <Button title="-" onPress={() => removeFromCart(foodId)} />
      <ThemedText style={styles.quantity}>{quantity}</ThemedText>
      <Button title="+" onPress={() => addToCart(foodId)} />
    </ThemedView>
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
  },
  controlContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16
  }
});

export default FoodList;
