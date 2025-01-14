import { TouchableOpacity, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { ParallaxScrollView, Surface, Text } from '@/components/common';
import { Card, IconButton, Searchbar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { getGreeting } from '@/utils';
import { CategoryVO, DishVO } from '@/types';
import { CategoryService } from '@/service';
import { useThemeColor } from '@/hooks/useThemeColor';
import Animated from 'react-native-reanimated';

export default function HomeLayout() {
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation();
  const colors = useThemeColor();

  const [categories, setCategories] = useState<CategoryVO[]>([]);

  const [dishes, setDishes] = useState<DishVO[]>([]);

  const fetchCategories = async () => {
    const res = await CategoryService.getList();
    setCategories(res);
    setSelectedCategory(res[0].id);
  };

  const fetchDishes = async () => {
    if (!selectedCategory) return;
    const res = await CategoryService.getDishesByCategoryId(selectedCategory);
    setDishes(res);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchDishes();
  }, [selectedCategory]);

  return (
    <ParallaxScrollView
      onRefresh={async () => {
        await fetchCategories();
        await fetchDishes();
      }}
    >
      {/* Header */}
      <Surface>
        <Text style={[styles.greeting, { color: colors.secondary }]}>{t(`common.${getGreeting()}`)}</Text>
        <Text style={styles.title} variant="titleLarge">
          {t('home.slogan')}
        </Text>
      </Surface>

      <Searchbar placeholder="Search" onChangeText={setSearchQuery} value={searchQuery} />

      {/* Categories */}
      <Surface style={styles.categoryContainer}>
        <Animated.ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => {
            const isSelected = category.id === selectedCategory;
            const backgroundColor = isSelected ? colors.primary : colors.surface;
            const textColor = isSelected ? colors.onPrimary : colors.onSurfaceVariant;

            return (
              <TouchableOpacity key={category.id} onPress={() => setSelectedCategory(category.id)}>
                <Surface style={[styles.categoryButton, { backgroundColor }]}>
                  <Text style={{ color: textColor }}>{category.name}</Text>
                </Surface>
              </TouchableOpacity>
            );
          })}
        </Animated.ScrollView>

        {categories.length > 10 && (
          <IconButton icon="view-grid-outline" size={20} onPress={() => console.log('Pressed')} />
        )}
      </Surface>

      {/* Dish Cards */}
      <Animated.FlatList
        data={dishes}
        numColumns={1}
        renderItem={({ item: dish }) => (
          <Surface style={styles.dishCard} elevation={2}>
            <Card.Cover
              source={{ uri: dish.image ?? 'https://picsum.photos/200/300' }}
              style={styles.dishImage}
              resizeMode="cover"
              testID="dish-image"
            />
            <Card.Content style={styles.dishContent}>
              <Surface style={styles.dishInfo} elevation={0}>
                <Text variant="titleMedium" ellipsizeMode="tail" style={styles.dishName} numberOfLines={2}>
                  {dish.name}10串鸭肠小船
                </Text>

                <Text variant="bodySmall" style={[styles.dishDescription, { color: colors.secondary }]}>
                  {dish.description}
                </Text>
              </Surface>

              <Surface style={styles.dishPriceContainer} elevation={0}>
                <Text variant="titleLarge" style={styles.dishPrice}>
                  ¥{dish.price}
                </Text>
                <IconButton icon="cart-outline" size={22} onPress={() => console.log('Pressed')} />
              </Surface>
            </Card.Content>
          </Surface>
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  greeting: {
    marginBottom: 8
  },
  title: {
    fontWeight: '600'
  },
  searchInput: {
    flex: 1,
    marginLeft: 8
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  categoryButton: {
    marginRight: 16,
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 25,
    alignItems: 'center',
    flexDirection: 'row'
  },
  dishContainer: {
    flex: 1
  },
  dishCard: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    height: 130
  },
  dishImage: {
    width: 120,
    height: '100%'
  },
  dishContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between'
  },
  dishInfo: {
    justifyContent: 'space-between'
  },
  dishName: {
    fontWeight: '600'
  },
  dishPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dishPrice: {
    fontWeight: '600'
  },
  dishDescription: {
    marginTop: 4
  }
});
