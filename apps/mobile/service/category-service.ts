import { Category } from '@imperial-kitchen/types';
import httpClient from './http-client';

export default class CategoryService {
  public static getList() {
    return httpClient.get<Category[]>('/category/list');
  }
}
