import { Router } from 'express';
import { UserController } from '../controller';

class UserRouter {
  public router: Router;
  private userController: UserController;

  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    console.log('initializeRoutes', 'user', this.userController.registerAdmin);
    this.router.post('/register/admin', (req, res, next) => this.userController.registerAdmin(req, res, next));
  }
}

export default UserRouter;
