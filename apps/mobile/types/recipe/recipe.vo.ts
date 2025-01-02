import { SvgProps } from 'react-native-svg';
import { TagVO } from '../tag/tag.vo';

export enum FoodType {
  Drink = 'drink',
  Dish = 'dish',
  Dessert = 'dessert'
}

export enum FoodDifficulty {
  Easy = 'easy',
  Middle = 'middle',
  Hard = 'hard'
}

export enum RecipeStepType {
  Text = 'text',
  Image = 'image',
  Video = 'video',
  Audio = 'audio'
}

export interface RecipeStepVO {
  order: number;
  type: RecipeStepType;
  description?: string;
  imageUrl?: string;
  videoUrl?: string;
  audioUrl?: string;
  duration?: number;
}

export interface RecipeVO {
  id: number;
  name: string;
  tags: TagVO[];
  steps: RecipeStepVO[];
  description: string;
  difficulty?: FoodDifficulty;
  createdAt: Date;
  updatedAt: Date;
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
