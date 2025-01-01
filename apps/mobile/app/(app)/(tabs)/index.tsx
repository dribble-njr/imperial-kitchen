import { TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaSurface, Surface, Text } from '@/components/common';
import { globalStyles } from '@/assets/styles';
import { Card, IconButton, Searchbar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { getGreeting } from '@/utils';
import { CategoryVO, DishVO } from '@/types';
import { CategoryService } from '@/service';
import { useThemeColor } from '@/hooks/useThemeColor';

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
    <SafeAreaSurface style={globalStyles.screenContent}>
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
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
        </ScrollView>

        {categories.length > 10 && (
          <IconButton icon="view-grid-outline" size={20} onPress={() => console.log('Pressed')} />
        )}
      </Surface>

      {/* Dish Cards */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Surface style={styles.dishGrid}>
          {dishes.map((dish) => (
            <Surface key={dish.id} style={[styles.dishCard]} elevation={4}>
              <TouchableOpacity key={dish.id}>
                <Card.Cover source={{ uri: dish.image }} style={styles.dishImage} resizeMode="cover" />
                <Card.Content style={styles.dishInfo}>
                  <Text style={[styles.dishTitle]}>{dish.name}</Text>
                </Card.Content>
              </TouchableOpacity>
            </Surface>
          ))}
        </Surface>
      </ScrollView>
    </SafeAreaSurface>
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
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  dishCard: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden'
  },
  dishImage: {
    width: '100%',
    height: 128
  },
  dishInfo: {
    padding: 12
  },
  dishTitle: {
    fontWeight: '500',
    marginBottom: 4
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
