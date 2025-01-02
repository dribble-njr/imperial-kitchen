import { CategoryVO, DishVO } from '@/types';
import httpClient from './http-client';

export default class CategoryService {
  public static getList() {
    return httpClient.get<CategoryVO[]>('/category');
  }

  public static getDishesByCategoryId(id: number) {
    return httpClient.get<DishVO[]>(`/category/${id}/dishes`);
  }
}
