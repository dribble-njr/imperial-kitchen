import { BaseService } from './base-service';
import { Category } from '@imperial-kitchen/types';

export default class CategoryService extends BaseService {
  constructor() {
    super();
  }

  async getAllCategories() {
    const res = await this.db.execute(`
      SELECT 
        c.id AS category_id, 
        c.name AS category_name, 
        c.description AS category_description, 
        g.id AS good_id, 
        g.name AS good_name, 
        g.price AS good_price, 
        g.description AS good_description
      FROM 
        category c
      LEFT JOIN 
        commodity g 
      ON 
        c.id = g.category_id
    `);

    console.log(res, 'category list');

    const categoryMap = new Map<number, Category>();

    res.rows.forEach((row) => {
      const categoryId = Number(row.category_id);
      if (!categoryMap.has(categoryId)) {
        categoryMap.set(categoryId, {
          id: categoryId,
          name: String(row.category_name),
          description: String(row.category_description),
          goods: []
        });
      }

      if (row.good_id) {
        categoryMap.get(categoryId)?.goods.push({
          id: Number(row.good_id),
          name: String(row.good_name),
          price: Number(row.good_price),
          categoryId: categoryId,
          description: row.good_description ? String(row.good_description) : undefined
        });
      }
    });

    return Array.from(categoryMap.values());
  }

  async createCategory(name: string) {
    const res = await this.db.execute({ sql: 'INSERT INTO category (name) VALUES (?)', args: [name] });
    return res.lastInsertRowid;
  }
}
