import { IncomingMessage, ServerResponse } from 'node:http';
import { Commodity } from '@imperial-kitchen/types';
import { CommodityService } from '../service';
import { BaseController } from './base-controller';
import { getPostData } from '../util';

export default class CommodityController extends BaseController {
  private commodityService: CommodityService;

  constructor() {
    super();
    this.commodityService = new CommodityService();
  }

  async create(req: IncomingMessage, res: ServerResponse) {
    const { categoryId, name, price, description } = await getPostData<Commodity>(req);
    console.log(categoryId, name, price, description);
    const id = await this.commodityService.createCommodity(categoryId, name as string, price, description);
    CommodityController.sendResponse(200, id, res);
  }
}
