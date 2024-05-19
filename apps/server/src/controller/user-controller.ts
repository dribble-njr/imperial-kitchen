import { IncomingMessage, ServerResponse } from 'node:http';
import { BaseController } from './base-controller';
import { getPostData } from '../util';
import { UserService } from '../service/user-service';
import { LoginParmas } from '@imperial-kitchen/types';

export default class UserController extends BaseController {
  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  async signIn(req: IncomingMessage, res: ServerResponse) {
    const data = await getPostData<LoginParmas>(req);
    const user = await this.userService.signIn(data);
    UserController.sendResponse(200, user, res);
  }
}
