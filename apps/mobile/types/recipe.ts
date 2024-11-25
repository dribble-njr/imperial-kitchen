import { TagVO } from '@imperial-kitchen/types';
import { SvgProps } from 'react-native-svg';

export enum FoodType {
  Drink = 'drink',
  Dish = 'dish',
  Dessert = 'dessert'
}

export const FoodTypeList = Object.values(FoodType);

export const FoodType2Label = {
  [FoodType.Drink]: '饮品',
  [FoodType.Dish]: '菜品',
  [FoodType.Dessert]: '甜品'
};

export const FoodType2Slogan = {
  [FoodType.Drink]: '喝点？',
  [FoodType.Dish]: '饿了么？',
  [FoodType.Dessert]: '嘿，腻不死你'
};

export const CreateRecipe = '_CreateRecipe' as const;
export type SidebarItemType = FoodType | typeof CreateRecipe;

export interface SidebarConfig {
  type: SidebarItemType;
  icon: React.FC<SvgProps>;
  position?: 'top' | 'center' | 'bottom';
  onSelect?: () => void; // 选中后执行的回调
}

export enum FoodDifficulty {
  Easy = 'easy',
  Middle = 'middle',
  Hard = 'hard'
}

export interface RecipeVO {
  id: number;
  name: string;
  tags: TagVO[];
  steps: string[];
  difficulty?: FoodDifficulty;
}

export type CreateRecipeVO = Omit<RecipeVO, 'id'>;