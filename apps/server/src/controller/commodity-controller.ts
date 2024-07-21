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
    const commodity = await getPostData<Commodity>(req);
    const id = await this.commodityService.createCommodity(commodity);
    CommodityController.sendResponse(200, id, res);
  }

  async update(req: IncomingMessage, res: ServerResponse) {
    const commodity = await getPostData<Commodity>(req);
    const updatedCommodity = await this.commodityService.updateCommodity(commodity);
    CommodityController.sendResponse(200, updatedCommodity, res);
  }

  async delete(req: IncomingMessage, res: ServerResponse) {
    const { id } = await getPostData<Commodity>(req);
    if (!id) {
      return CommodityController.sendResponse(400, 'id is required', res);
    }
    const isDeleted = await this.commodityService.deleteCommodity(id);
    CommodityController.sendResponse(200, isDeleted, res);
  }
}
