import { BaseService } from './base-service';
import { Category } from '@imperial-kitchen/types';

export class CategoryService extends BaseService {
  constructor() {
    super();
  }

  async getAllCategories() {
    const res = await this.db.execute('SELECT * FROM categories');
    const categories: Category[] = res.rows.map((row) => ({ id: Number(row.id), name: String(row.name) }));
    return categories;
  }

  async createCategory(name: string) {
    const res = await this.db.execute({ sql: 'INSERT INTO categories (name) VALUES (?)', args: [name] });
    return res.lastInsertRowid;
  }
}
