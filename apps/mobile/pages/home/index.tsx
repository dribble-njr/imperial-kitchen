import { Image, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { Category } from '@imperial-kitchen/types';

import { CategoryList, FoodList, Header } from '@/components/home';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { CategoryService } from '@/service';
import { ThemedText } from '@/components/ThemedText';
import { CartProvider } from '@/context/CartContext';

export const HomePage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState(0);

  const getCategories = async () => {
    const categories = await CategoryService.getList();
    setActiveCategoryId(categories[0].id!);
    setCategories(categories);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <CartProvider>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={<Image source={require('@/assets/images/partial-react-logo.png')} style={styles.reactLogo} />}
      >
        <Header />

        {categories.length ? (
          <ThemedView style={styles.container}>
            <ThemedView style={styles.sidebar}>
              <CategoryList categories={categories} activeCategoryId={activeCategoryId} onCategoryPress={() => {}} />
            </ThemedView>

            <ThemedView style={styles.main}>
              <FoodList categories={categories} onScroll={() => {}} />
            </ThemedView>
          </ThemedView>
        ) : (
          <ThemedText>loading...</ThemedText>
        )}
      </ParallaxScrollView>
    </CartProvider>
  );
};

const styles = StyleSheet.create({
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative'
  },
  sidebar: {
    width: 100,
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1
  },
  main: {
    flex: 1,
    marginLeft: 100
  }
});
