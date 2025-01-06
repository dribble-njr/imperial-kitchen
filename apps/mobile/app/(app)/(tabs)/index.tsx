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
    <ParallaxScrollView>
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
      <Animated.ScrollView showsVerticalScrollIndicator={false} horizontal>
        <Surface style={styles.dishGrid}>
          {dishes.map((dish) => (
            <Card key={dish.id} elevation={5} contentStyle={{ width: 217, height: 291 }}>
              <Card.Cover source={{ uri: dish.image }} style={styles.dishImage} resizeMode="cover" />
              <Card.Title
                title={`${dish.name} • ¥${dish.price}`}
                subtitle={dish.description}
                titleStyle={styles.dishTitle}
                subtitleStyle={{ color: colors.secondary }}
                right={() => <IconButton icon="cart-outline" size={24} onPress={() => console.log('Pressed')} />}
              />
            </Card>
          ))}
        </Surface>
      </Animated.ScrollView>
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
  dishGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16
  },
  dishImage: {
    flex: 1
  },
  dishTitle: {
    fontWeight: 700,
    marginBottom: 4
  },
  dishInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dishDetails: {
    fontSize: 12
  },
  recommendationBox: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 24
  },
  recommendationCategory: {
    color: '#FF97B5'
  },
  recommendationContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8
  },
  recommendationText: {
    color: 'white',
    fontSize: 18
  },
  exploreButton: {
    backgroundColor: '#FF97B5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 25
  },
  exploreButtonText: {
    color: 'black'
  }
});
