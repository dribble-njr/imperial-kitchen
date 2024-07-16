import { FC } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedRef } from 'react-native-reanimated';
import { Category } from '@imperial-kitchen/types';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';

interface CategoryListProps {
  categories: Category[];
  activeCategoryId: number;
  onCategoryPress: (categoryId: number) => void;
}

const CategoryList: FC<CategoryListProps> = ({ categories, activeCategoryId, onCategoryPress }) => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  return (
    <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
      <ThemedView>
        {categories.map((category) => (
          <div
            onClick={() => onCategoryPress(category.id)}
            key={category.id}
            style={category.id === activeCategoryId ? styles.active : undefined}
          >
            <ThemedText key={category.id}>{category.name}</ThemedText>
          </div>
        ))}
      </ThemedView>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  active: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  }
});

export default CategoryList;
