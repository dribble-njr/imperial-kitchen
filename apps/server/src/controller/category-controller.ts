import { IncomingMessage, ServerResponse } from 'node:http';
import { BaseController } from './base-controller';
import { getQueryParams } from '../util';
import { CategoryService } from '../service';

export default class CategoryController extends BaseController {
  private categoryService: CategoryService;

  constructor() {
    super();
    this.categoryService = new CategoryService();
  }

  async list(req: IncomingMessage, res: ServerResponse) {
    const categories = await this.categoryService.getAllCategories();
    console.log('🚀 ~ CategoryController ~ list ~ categories:', categories);
    CategoryController.sendResponse(200, categories, res);
  }

  async create(req: IncomingMessage, res: ServerResponse) {
    const { name } = getQueryParams(req.url);
    const id = await this.categoryService.createCategory(name as string);
    CategoryController.sendResponse(200, id, res);
  }
}
