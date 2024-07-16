import { Dimensions, Image, StyleSheet } from 'react-native';

import { CategoryList, FoodList, Header } from '@/components/home';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { Category, Commodity } from '@imperial-kitchen/types';
import useSyncScroll from '@/hooks/useSyncScroll';

// mock
const goods1: Commodity[] = [
  { id: 1, name: 'Food 1', price: 10 },
  { id: 2, name: 'Food 2', price: 20 },
  { id: 3, name: 'Food 3', price: 30 },
  { id: 4, name: 'Food 4', price: 40 },
  { id: 5, name: 'Food 5', price: 50 },
  { id: 6, name: 'Food 6', price: 60 },
  { id: 7, name: 'Food 7', price: 70 }
];

const goods2: Commodity[] = [
  { id: 8, name: 'Food 1', price: 10 },
  { id: 9, name: 'Food 2', price: 20 },
  { id: 10, name: 'Food 3', price: 30 },
  { id: 11, name: 'Food 4', price: 40 },
  { id: 12, name: 'Food 5', price: 50 },
  { id: 13, name: 'Food 6', price: 60 },
  { id: 14, name: 'Food 7', price: 70 }
];

const goods3: Commodity[] = [
  { id: 15, name: 'Food 1', price: 10 },
  { id: 16, name: 'Food 2', price: 20 },
  { id: 17, name: 'Food 3', price: 30 },
  { id: 18, name: 'Food 4', price: 40 },
  { id: 19, name: 'Food 5', price: 50 },
  { id: 20, name: 'Food 6', price: 60 },
  { id: 21, name: 'Food 7', price: 70 }
];

const goods4: Commodity[] = [
  { id: 22, name: 'Food 1', price: 10 },
  { id: 23, name: 'Food 2', price: 20 },
  { id: 24, name: 'Food 3', price: 30 },
  { id: 25, name: 'Food 4', price: 40 },
  { id: 26, name: 'Food 5', price: 50 },
  { id: 27, name: 'Food 6', price: 60 },
  { id: 28, name: 'Food 7', price: 70 }
];

const goods5: Commodity[] = [
  { id: 29, name: 'Food 1', price: 10 },
  { id: 30, name: 'Food 2', price: 20 },
  { id: 31, name: 'Food 3', price: 30 },
  { id: 32, name: 'Food 4', price: 40 },
  { id: 33, name: 'Food 5', price: 50 },
  { id: 34, name: 'Food 6', price: 60 },
  { id: 35, name: 'Food 7', price: 70 }
];

const goods6: Commodity[] = [
  { id: 36, name: 'Food 1', price: 10 },
  { id: 37, name: 'Food 2', price: 20 },
  { id: 38, name: 'Food 3', price: 30 },
  { id: 39, name: 'Food 4', price: 40 },
  { id: 40, name: 'Food 5', price: 50 },
  { id: 41, name: 'Food 6', price: 60 },
  { id: 42, name: 'Food 7', price: 70 }
];

const goods7: Commodity[] = [
  { id: 43, name: 'Food 1', price: 10 },
  { id: 44, name: 'Food 2', price: 20 },
  { id: 45, name: 'Food 3', price: 30 },
  { id: 46, name: 'Food 4', price: 40 },
  { id: 47, name: 'Food 5', price: 50 },
  { id: 48, name: 'Food 6', price: 60 },
  { id: 49, name: 'Food 7', price: 70 }
];

const goods8: Commodity[] = [
  { id: 50, name: 'Food 1', price: 10 },
  { id: 51, name: 'Food 2', price: 20 },
  { id: 52, name: 'Food 3', price: 30 },
  { id: 53, name: 'Food 4', price: 40 },
  { id: 54, name: 'Food 5', price: 50 },
  { id: 55, name: 'Food 6', price: 60 },
  { id: 56, name: 'Food 7', price: 70 }
];

const categories: Category[] = [
  { id: 1, name: 'Category 1', goods: goods1 },
  { id: 2, name: 'Category 2', goods: goods2 },
  { id: 3, name: 'Category 3', goods: goods3 },
  { id: 4, name: 'Category 4', goods: goods4 },
  { id: 5, name: 'Category 5', goods: goods5 },
  { id: 6, name: 'Category 6', goods: goods6 },
  { id: 7, name: 'Category 7', goods: goods7 },
  { id: 8, name: 'Category 8', goods: goods8 }
];

const screenHeight = Dimensions.get('window').height;

export default function HomeScreen() {
  const { activeCategoryId, handleCategoryPress, handleScroll } = useSyncScroll(categories);
  console.log('🚀 ~ HomeScreen ~ activeCategoryId:', activeCategoryId);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<Image source={require('@/assets/images/partial-react-logo.png')} style={styles.reactLogo} />}
    >
      <Header />
      <ThemedView style={styles.container}>
        <ThemedView style={styles.sidebar}>
          <CategoryList
            categories={categories}
            activeCategoryId={activeCategoryId}
            onCategoryPress={handleCategoryPress}
          />
        </ThemedView>

        <ThemedView style={styles.main}>
          <FoodList categories={categories} onScroll={handleScroll} />
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

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
    flexDirection: 'row'
  },
  sidebar: {
    width: 100,
    height: screenHeight,
    backgroundColor: '#f4f4f4',
    borderRightWidth: 1,
    borderRightColor: '#ddd'
  },
  main: {
    flex: 1
  }
});
