import { Router } from 'express';
import { UserController } from '../controller/index.ts';
import { authMiddleware } from '../middleware/index.ts';

class UserRouter {
  public router: Router;
  private userController: UserController;

  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      '/register/admin',
      async (req, res, next) => await this.userController.registerAdmin(req, res, next)
    );
    this.router.post(
      '/register/member',
      async (req, res, next) => await this.userController.registerMember(req, res, next)
    );
    this.router.get('/register/captcha', async (req, res, next) => await this.userController.captcha(req, res, next));
    this.router.post('/login', async (req, res, next) => await this.userController.login(req, res, next));
    this.router.get('/aaa', authMiddleware, async (req, res, next) => await this.userController.aaa(req, res, next));
    this.router.get('/all', async (req, res, next) => await this.userController.findAllUser(req, res, next));
    this.router.get('/refresh', async (req, res, next) => await this.userController.refresh(req, res, next));
  }
}

export default UserRouter;
