import { Commodity } from '@imperial-kitchen/types';
import { BaseService } from './base-service';

export default class CommodityService extends BaseService {
  constructor() {
    super();
  }

  async createCommodity(commodity: Commodity) {
    const { name, price, description, categoryId } = commodity;
    const res = await this.db.execute({
      sql: 'INSERT INTO commodity (category_id, name, price, description) VALUES (?, ?, ?, ?)',
      args: [categoryId ?? null, name ?? null, price ?? null, description ?? null]
    });
    return res.lastInsertRowid;
  }

  async updateCommodity(commodity: Commodity) {
    const { id, name, price, description, categoryId } = commodity;
    await this.db.execute({
      sql: 'UPDATE commodity SET name = ?, price = ?, description = ?, category_id = ? WHERE id = ?',
      args: [name ?? null, price ?? null, description ?? null, categoryId ?? null, id ?? null]
    });
    return commodity;
  }

  async deleteCommodity(id: number) {
    const res = await this.db.execute({ sql: 'DELETE FROM commodity WHERE id = ?', args: [id] });
    console.log(res, 'delete res');
    return !!res.rowsAffected;
  }
}
