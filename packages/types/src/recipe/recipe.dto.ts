import { TagVO } from '../tag/tag.vo';
import { FoodDifficulty } from './recipe.vo';

export interface CreateRecipeDTO {
  name: string;
  tags: TagVO[];
  steps: string[];
  difficulty?: FoodDifficulty;
}
