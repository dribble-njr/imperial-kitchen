import { Request, Response, NextFunction } from 'express';
import { SignInParams } from '@imperial-kitchen/types';
import { BaseController } from './base-controller';
import { UserService } from '../service';

export default class UserController extends BaseController {
  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  async registerAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(this, 'userService');
      const user = await this.userService.registerAdmin(req.body as SignInParams);
      res.json(user);
      next();
    } catch (error) {
      next(error);
    }
    const data = await req.body;

    console.log(data, 'body');
  }
}
