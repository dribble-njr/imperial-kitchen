import { ServerResponse } from 'node:http';
import { Commodity } from '@imperial-kitchen/types';
import { CommodityService } from '../service';
import { BaseController } from './base-controller';
import { getRequestBody } from '../util';
import { CustomIncomingMessage } from '../types';

export default class CommodityController extends BaseController {
  private commodityService: CommodityService;

  constructor() {
    super();
    this.commodityService = new CommodityService();
  }

  async create(req: CustomIncomingMessage, res: ServerResponse) {
    const commodity = await getRequestBody<Commodity>(req);
    const id = await this.commodityService.createCommodity(commodity);
    CommodityController.sendResponse(200, id, res);
  }

  async update(req: CustomIncomingMessage, res: ServerResponse) {
    const commodity = await getRequestBody<Commodity>(req);
    const updatedCommodity = await this.commodityService.updateCommodity(commodity);
    CommodityController.sendResponse(200, updatedCommodity, res);
  }

  async delete(req: CustomIncomingMessage, res: ServerResponse) {
    if (!req.params.id) {
      return CommodityController.sendResponse(400, 'id is required', res);
    }
    const isDeleted = await this.commodityService.deleteCommodity(Number(req.params.id));
    CommodityController.sendResponse(200, isDeleted, res);
  }
}
