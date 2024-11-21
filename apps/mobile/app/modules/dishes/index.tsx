import CookIcon from '@/assets/icons/cook-icon.svg';
import DessertIcon from '@/assets/icons/dessert-icon.svg';
import DishIcon from '@/assets/icons/dish-icon.svg';
import DrinkIcon from '@/assets/icons/drink-icon.svg';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { CreateDishGuide } from './components/CreateDishGuide';
import { FoodListLayout } from './components/FoodListLayout';
import { SideBar } from './components/SideBar';
import { CreateDish, FoodType, SidebarConfig, SidebarItemType } from './types';

const SidebarConfigs: SidebarConfig[] = [
  {
    type: CreateDish,
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

export default function DishesPage() {
  const [selectedKey, setSelectedKey] = useState<SidebarItemType>(SidebarConfigs[0].type);

  return (
    <ThemedView className="w-full h-full flex flex-row">
      <SideBar configs={SidebarConfigs} selectedKey={selectedKey} onSelect={setSelectedKey} />
      {selectedKey === CreateDish ? <CreateDishGuide /> : <FoodListLayout type={selectedKey} />}
    </ThemedView>
  );
}
