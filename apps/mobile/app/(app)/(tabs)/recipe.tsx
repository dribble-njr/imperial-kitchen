import CookIcon from '@/assets/icons/cook-icon.svg';
import DessertIcon from '@/assets/icons/dessert-icon.svg';
import DishIcon from '@/assets/icons/dish-icon.svg';
import DrinkIcon from '@/assets/icons/drink-icon.svg';
import { CreateRecipe, SidebarConfig, SidebarItemType } from '@/types';
import { FoodType } from '@imperial-kitchen/types';
import { useState } from 'react';
import { CreateRecipeGuide, FoodListLayout, SideBar } from '@/components/recipe';
import { Surface } from '@/components/common';
import { StyleSheet } from 'react-native';

const SidebarConfigs: SidebarConfig[] = [
  {
    type: CreateRecipe,
    icon: CookIcon,
    position: 'bottom'
  },
  {
    type: FoodType.Dish,
    icon: DishIcon
  },
  {
    type: FoodType.Dessert,
    icon: DessertIcon
  },
  {
    type: FoodType.Drink,
    icon: DrinkIcon
  }
];

export default function RecipeScreen() {
  const [selectedKey, setSelectedKey] = useState<SidebarItemType>(SidebarConfigs[0].type);

  return (
    <Surface style={styles.container}>
      <SideBar configs={SidebarConfigs} selectedKey={selectedKey} onSelect={setSelectedKey} />
      {selectedKey === CreateRecipe ? <CreateRecipeGuide /> : <FoodListLayout type={selectedKey} />}
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    position: 'relative'
  }
});
