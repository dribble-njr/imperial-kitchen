import { ServerResponse } from 'node:http';
import { CommodityService } from '../service/index.ts';
import { BaseController } from './base.controller.ts';
import { CustomIncomingMessage } from '../types.ts';

export default class CommodityController extends BaseController {
  private commodityService: CommodityService;

  constructor() {
    super();
    this.commodityService = new CommodityService();
  }

  async delete(req: CustomIncomingMessage, res: ServerResponse) {
    if (!req.params.id) {
      return CommodityController.sendResponse(400, 'id is required', res);
    }
    const isDeleted = await this.commodityService.deleteCommodity(Number(req.params.id));
    CommodityController.sendResponse(200, isDeleted, res);
  }
}
