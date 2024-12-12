import CookIcon from '@/assets/icons/cook-icon.svg';
import DessertIcon from '@/assets/icons/dessert-icon.svg';
import DishIcon from '@/assets/icons/dish-icon.svg';
import DrinkIcon from '@/assets/icons/drink-icon.svg';
import { CreateRecipe, SidebarConfig, SidebarItemType } from '@/types';
import { FoodType } from '@imperial-kitchen/types';
import { useState } from 'react';
import SideBar from './components/SideBar';
import CreateRecipeGuide from './components/CreateRecipeGuide';
import FoodListLayout from './components/FoodListLayout';
import { Surface } from '@/components/common';

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

export default function DishesPage() {
  const [selectedKey, setSelectedKey] = useState<SidebarItemType>(SidebarConfigs[0].type);

  return (
    <Surface className="w-full h-full flex flex-row relative">
      <SideBar configs={SidebarConfigs} selectedKey={selectedKey} onSelect={setSelectedKey} />
      {selectedKey === CreateRecipe ? <CreateRecipeGuide /> : <FoodListLayout type={selectedKey} />}
    </Surface>
  );
}
