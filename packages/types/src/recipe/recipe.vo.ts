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
