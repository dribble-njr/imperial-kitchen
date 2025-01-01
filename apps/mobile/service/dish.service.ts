import httpClient from './http-client';

export default class DishService {
  public static getList() {
    return httpClient.get<DishVO[]>('/dish');
  }
}
