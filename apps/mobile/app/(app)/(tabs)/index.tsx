import { TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaSurface, Surface, Text } from '@/components/common';
import { globalStyles } from '@/assets/styles';
import { Card, IconButton, Searchbar, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { getGreeting } from '@/utils';
import { CategoryVO } from '@/types';
import { CategoryService } from '@/service';

const recipeCards = [
  {
    id: 1,
    title: 'Bread Toast Egg',
    image: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
    ingredients: 4,
    duration: 15,
    category: 'Breakfast'
  },
  {
    id: 2,
    title: 'Bread Toast',
    image: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
    ingredients: 4,
    duration: 15,
    category: 'Breakfast'
  }
];

export default function HomeLayout() {
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation();
  const theme = useTheme();

  const [categories, setCategories] = useState<CategoryVO[]>([]);

  useEffect(() => {
    CategoryService.getList().then((res) => {
      setCategories(res);
    });
  }, []);

  return (
    <SafeAreaSurface style={globalStyles.screenContent}>
      {/* Header */}
      <Surface>
        <Text style={[styles.greeting, { color: theme.colors.secondary }]}>{t(`common.${getGreeting()}`)}</Text>
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
            const backgroundColor = isSelected ? theme.colors.primary : theme.colors.surface;
            const textColor = isSelected ? theme.colors.onPrimary : theme.colors.onSurfaceVariant;

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

      {/* Recipe Cards */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Surface style={styles.recipeGrid}>
          {recipeCards.map((recipe) => (
            <Surface key={recipe.id} style={[styles.recipeCard]} elevation={4}>
              <TouchableOpacity key={recipe.id}>
                <Card.Cover source={{ uri: recipe.image }} style={styles.recipeImage} resizeMode="cover" />
                <Card.Content style={styles.recipeInfo}>
                  <Text style={[styles.recipeTitle]}>{recipe.title}</Text>
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
  recipeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  recipeCard: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden'
  },
  recipeImage: {
    width: '100%',
    height: 128
  },
  recipeInfo: {
    padding: 12
  },
  recipeTitle: {
    fontWeight: '500',
    marginBottom: 4
  },
  recipeDetails: {
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
