import { Commodity } from '@imperial-kitchen/types';

export default class CommodityService {
  constructor() {}

  async createCommodity(commodity: Commodity) {
    console.log(commodity, 'createCommodity');
  }

  async updateCommodity(commodity: Commodity) {
    console.log(commodity, 'updateCommodity');
  }

  async deleteCommodity(id: number) {
    console.log(id, 'deleteCommodity');
  }
}
