import { CreateDishDTO, DishVO, UpdateDishDTO } from '@/types';
import httpClient from './http-client';

export default class DishService {
  public static create(dish: CreateDishDTO) {
    return httpClient.post<DishVO, CreateDishDTO>('/dish', dish);
  }

  public static update(dish: UpdateDishDTO) {
    return httpClient.put<boolean, UpdateDishDTO>('/dish', dish);
  }
}
