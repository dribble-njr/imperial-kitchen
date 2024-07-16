import { Category } from '@imperial-kitchen/types';
import { useRef, useState } from 'react';
import { NativeSyntheticEvent, NativeScrollEvent, ScrollView } from 'react-native';

const useSyncScroll = (categories: Category[]) => {
  const [activeCategoryId, setActiveCategoryId] = useState<number>(categories[0]?.id);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleCategoryPress = (categoryId: number) => {
    setActiveCategoryId(categoryId);

    // calculate yOffset
    const sectionIndex = categories.findIndex((cat) => cat.id === categoryId);
    let yOffset = 0;
    for (let i = 0; i < sectionIndex; i++) {
      yOffset += calculateCategoryHeight(categories[i]);
    }

    scrollViewRef.current?.scrollTo({ y: yOffset, animated: true });
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    let cumulativeHeight = 0;
    let foundIndex = -1;

    for (let i = 0; i < categories.length; i++) {
      const categoryHeight = calculateCategoryHeight(categories[i]);
      if (scrollY >= cumulativeHeight && scrollY < cumulativeHeight + categoryHeight) {
        foundIndex = i;
        break;
      }
      cumulativeHeight += categoryHeight;
    }

    if (foundIndex !== -1) {
      setActiveCategoryId(categories[foundIndex].id);
    }
  };

  return { activeCategoryId, handleCategoryPress, handleScroll, scrollViewRef };
};

const calculateCategoryHeight = (category: Category): number => {
  // Calculate height based on number of foods, plus additional padding/margins as needed
  const numFoods = category.goods.length;
  const baseHeight = 50; // Base height for each category section
  const paddingHeight = 20; // Additional padding/margins
  const totalHeight = baseHeight + numFoods * 300 + paddingHeight; // Adjust as per your design

  return totalHeight;
};

export default useSyncScroll;
