import { CategoryVO, DishVO } from '@/types';
import httpClient from './http-client';

export default class CategoryService {
  public static getList() {
    return httpClient.get<CategoryVO[]>('/category');
  }

  public static getDishesByCategoryId(id: number, offset: number = 0, limit: number = 10) {
    return httpClient.get<DishVO[]>(`/category/${id}/dishes?offset=${offset}&limit=${limit}`);
  }

  public static getTrashDishesByCategoryId(id: number, offset: number = 0, limit: number = 10) {
    return httpClient.get<DishVO[]>(`/category/${id}/dishes/trash?offset=${offset}&limit=${limit}`);
  }
}
