import { IncomingMessage, ServerResponse } from 'node:http';
import { BaseController } from './base-controller';
import { getPostData } from '../util';
import { UserService } from '../service/user-service';
import { SignInParams } from '@imperial-kitchen/types';

export default class UserController extends BaseController {
  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  async signIn(req: IncomingMessage, res: ServerResponse) {
    try {
      const start = Date.now();
      const data = await getPostData<SignInParams>(req);

      // TODO: verify parameters.

      const response = await this.userService.signIn(data);

      console.log('All time: ', Date.now() - start);
      UserController.sendResponse(response.code, { message: response.message }, res);
    } catch (error) {
      UserController.sendResponse(500, { message: 'Internal Server Error' }, res);
      throw error;
    }
  }
}
