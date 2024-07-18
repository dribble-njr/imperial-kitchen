import { BaseService } from './base-service';

export default class CommodityService extends BaseService {
  constructor() {
    super();
  }

  async createCommodity(categoryId: number, name: string, price: number, description?: string) {
    const res = await this.db.execute({
      sql: 'INSERT INTO commodity (category_id, name, price, description) VALUES (?, ?, ?, ?)',
      args: [categoryId, name, price, description ?? null]
    });
    return res.lastInsertRowid;
  }
}
