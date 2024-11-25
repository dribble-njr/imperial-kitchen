export enum TagType {
  Recipe = 'recipe',
  Dish = 'dish'
}

export interface TagVO {
  id: number;
  name: string;
  type: TagType;
  createdAt: Date;
  updatedAt: Date;
}
