export interface DishVO {
  id: number;
  name: string;
  price: number;
  description?: string;
  tags?: string[];
  image?: string;
}
