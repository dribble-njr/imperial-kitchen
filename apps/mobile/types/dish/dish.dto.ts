export interface CreateDishDTO {
  name: string;
  price: number;
  image?: string;
  description?: string;
  kitchenId: number;
  categoryId: number;
  tags?: number[];
}

export interface UpdateDishDTO extends CreateDishDTO {
  id: number;
}
