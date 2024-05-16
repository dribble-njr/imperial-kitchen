import { BaseService } from './base-service';

export class CategoryService extends BaseService {
  constructor() {
    super();
  }

  async getAllCategories() {
    const res = await this.db.execute('SELECT * FROM categories');
    return res.rows;
  }

  async createCategory(name: string) {
    const res = await this.db.execute({ sql: 'INSERT INTO categories (name) VALUES (?)', args: [name] });
    return res.lastInsertRowid;
  }
}
