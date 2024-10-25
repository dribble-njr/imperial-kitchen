import { ServerResponse } from 'node:http';
import { BaseController } from './base.controller.ts';
import { CategoryService } from '../service/index.ts';
import { CustomIncomingMessage } from '../types.ts';

export default class CategoryController extends BaseController {
  private categoryService: CategoryService;

  constructor() {
    super();
    this.categoryService = new CategoryService();
  }

  async list(req: CustomIncomingMessage, res: ServerResponse) {
    const categories = await this.categoryService.getAllCategories();
    CategoryController.sendResponse(200, categories, res);
  }

  async delete(req: CustomIncomingMessage, res: ServerResponse) {
    if (!req.params.id) {
      return CategoryController.sendResponse(400, 'id is required', res);
    }
    const isDeleted = await this.categoryService.deleteCategory(Number(req.params.id));
    CategoryController.sendResponse(200, isDeleted, res);
  }
}
