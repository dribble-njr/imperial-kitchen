import { CategoryVO } from '@/types';
import httpClient from './http-client';

export default class CategoryService {
  public static getList() {
    return httpClient.get<CategoryVO[]>('/category');
  }
}
