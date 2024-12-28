import { TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaSurface, Surface, Text } from '@/components/common';
import { globalStyles } from '@/assets/styles';
import { Card, Searchbar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { getGreeting } from '@/utils';
import { CategoryVO } from '@imperial-kitchen/types';
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
        <Text style={styles.greeting}>{t(`common.${getGreeting()}`)}</Text>
        <Text style={styles.title} variant="titleLarge">
          {t('home.slogan')}
        </Text>
      </Surface>

      <Searchbar placeholder="Search" onChangeText={setSearchQuery} value={searchQuery} />

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => setSelectedCategory(category.id)}
            style={[styles.categoryButton, selectedCategory === category.id ? styles.categoryButtonActive : null]}
          >
            <Text style={[styles.categoryText, selectedCategory === category.id ? styles.categoryTextActive : null]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Recipe Cards */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Surface style={styles.recipeGrid}>
          {recipeCards.map((recipe) => (
            <TouchableOpacity key={recipe.id} style={styles.recipeCard}>
              <Card.Cover source={{ uri: recipe.image }} style={styles.recipeImage} resizeMode="cover" />
              <Card.Content>
                <Text style={styles.recipeCategory}>{recipe.category}</Text>
                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                <Text style={styles.recipeDetails}>
                  {recipe.ingredients} Ingredients | {recipe.duration} Min
                </Text>
              </Card.Content>
            </TouchableOpacity>
          ))}
        </Surface>

        {/* Recommendation Section */}
        <Surface style={styles.recommendationBox} elevation={2}>
          <Text style={styles.recommendationCategory}>Breakfast</Text>
          <Surface style={styles.recommendationContent} elevation={2}>
            <Text style={styles.recommendationText}>We have 12 Recipes recommendation</Text>
            <TouchableOpacity style={styles.exploreButton}>
              <Text style={styles.exploreButtonText}>Explore</Text>
            </TouchableOpacity>
          </Surface>
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
    marginLeft: 8,
    color: 'white'
  },
  categoryButton: {
    marginRight: 16,
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 25,
    backgroundColor: '#2C2C2E',
    alignItems: 'center',
    flexDirection: 'row'
  },
  categoryButtonActive: {
    backgroundColor: '#FF97B5'
  },
  categoryText: {
    color: 'white'
  },
  categoryTextActive: {
    color: 'black'
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
  recipeCategory: {
    color: '#8E8E93',
    fontSize: 12
  },
  recipeTitle: {
    color: 'white',
    fontWeight: '500',
    marginBottom: 4
  },
  recipeDetails: {
    color: '#8E8E93',
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
