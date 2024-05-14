import { IncomingMessage, ServerResponse } from 'node:http';
import { BaseController } from './base-controller';
import { getQueryParams } from '../util';

export default class CategoryController extends BaseController {
  constructor() {
    super();
  }

  list(req: IncomingMessage, res: ServerResponse) {
    const response = 'hello world';
    CategoryController.sendResponse(200, response, res);
  }

  create(req: IncomingMessage, res: ServerResponse) {
    const { name } = getQueryParams(req.url);
  }
}
