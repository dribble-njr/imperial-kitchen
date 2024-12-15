import { TextInput, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ParallaxScrollView, Surface, Text } from '@/components/common';

const categories = ['All', 'Breakfast', 'Lunch', 'Dinner'];

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
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <ParallaxScrollView>
      <Stack.Screen
        options={{
          headerShown: false
        }}
      />

      {/* Header */}
      <Surface style={styles.header}>
        <Text style={styles.greeting}>Good Morning</Text>
        <Text style={styles.title}>What would you like to cook for today?</Text>
      </Surface>

      {/* Search Bar */}
      <Surface style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#8E8E93" />
        <TextInput placeholder="Search any recipes..." placeholderTextColor="#8E8E93" style={styles.searchInput} />
      </Surface>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)}
            style={[styles.categoryButton, selectedCategory === category ? styles.categoryButtonActive : null]}
          >
            <Text style={[styles.categoryText, selectedCategory === category ? styles.categoryTextActive : null]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Recipe Cards */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Surface style={styles.recipeGrid}>
          {recipeCards.map((recipe) => (
            <TouchableOpacity key={recipe.id} style={styles.recipeCard}>
              <Image source={{ uri: recipe.image }} style={styles.recipeImage} resizeMode="cover" />
              <Surface style={styles.recipeInfo}>
                <Text style={styles.recipeCategory}>{recipe.category}</Text>
                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                <Text style={styles.recipeDetails}>
                  {recipe.ingredients} Ingredients | {recipe.duration} Min
                </Text>
              </Surface>
            </TouchableOpacity>
          ))}
        </Surface>

        {/* Recommendation Section */}
        <Surface style={styles.recommendationBox}>
          <Text style={styles.recommendationCategory}>Breakfast</Text>
          <Surface style={styles.recommendationContent}>
            <Text style={styles.recommendationText}>We have 12 Recipes recommendation</Text>
            <TouchableOpacity style={styles.exploreButton}>
              <Text style={styles.exploreButtonText}>Explore</Text>
            </TouchableOpacity>
          </Surface>
        </Surface>
      </ScrollView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 24
  },
  greeting: {
    color: 'white',
    fontSize: 18,
    marginBottom: 8
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2C2E',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 24
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: 'white'
  },
  categoryContainer: {
    marginBottom: 24
  },
  categoryButton: {
    marginRight: 16,
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 25,
    backgroundColor: '#2C2C2E'
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
    backgroundColor: '#2C2C2E',
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
    backgroundColor: '#2C2C2E',
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
