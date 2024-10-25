import { Router } from 'express';
import { UserController } from '../controller/index.ts';
import { validateDtoMiddleware } from '../middleware/index.ts';
import { RegisterAdminDto, RegisterMemberDto } from '../type/dto/index.ts';

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
      validateDtoMiddleware(RegisterAdminDto),
      this.userController.registerAdmin.bind(this.userController)
    );

    this.router.post(
      '/register/member',
      validateDtoMiddleware(RegisterMemberDto),
      this.userController.registerMember.bind(this.userController)
    );

    this.router.get('/:id', this.userController.getUserById.bind(this.userController));

    this.router.get('/register/captcha', async (req, res, next) => await this.userController.captcha(req, res, next));

    this.router.post('/login', async (req, res, next) => await this.userController.login(req, res, next));

    this.router.get('/refresh', async (req, res, next) => await this.userController.refresh(req, res, next));
  }
}

export default UserRouter;
