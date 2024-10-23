import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { BaseController } from './base-controller.ts';
import { UserService } from '../service/index.ts';
import { generateToken } from '../middleware/auth.ts';
import config from '../config/index.ts';
import { AppError } from '../lib/index.ts';
import { LoginUserDto, RegisterUserDto } from '../dto/index.ts';
import { ERROR_CODES } from '@imperial-kitchen/types';

export default class UserController extends BaseController {
  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  async registerAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userService.registerAdmin(req.body as RegisterUserDto);
      res.json(user);
      next();
    } catch (error) {
      next(error);
    }
    const data = await req.body;

    console.log(data, 'body');
  }

  async registerMember(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userService.register(req.body as RegisterUserDto);
      res.json(user);
      next();
    } catch (error) {
      next(error);
    }
    const data = await req.body;

    console.log(data, 'body');
  }

  async captcha(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.query, 'captcha');
      if (req.query.email) {
        res.json(await this.userService.captcha(req.query.email as string));
        next();
      } else {
        next(new AppError(ERROR_CODES.EMAIL_IS_REQUIRED, 400));
      }
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const vo = await this.userService.login(req.body as LoginUserDto);
      vo.accessToken = generateToken(
        {
          id: vo.userInfo.id,
          name: vo.userInfo.name,
          roles: vo.userInfo.role
        },
        '30m'
      );
      vo.refreshToken = generateToken(
        {
          id: vo.userInfo.id
        },
        '7d'
      );
      res.json(vo);
      next();
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.query.refreshToken;
      const secret = config.JWT_SECRET;
      const data = jwt.verify(refreshToken as string, secret) as { id: number };

      const vo = await this.userService.findUserById(data.id);
      vo.accessToken = generateToken(
        {
          id: vo.userInfo.id,
          name: vo.userInfo.name,
          roles: vo.userInfo.role
        },
        '30m'
      );
      vo.refreshToken = generateToken(
        {
          id: vo.userInfo.id
        },
        '7d'
      );
      res.json(vo);
      next();
    } catch (error) {
      next(error);
    }
  }

  async aaa(req: Request, res: Response, next: NextFunction) {
    try {
      res.json('success');
      next();
    } catch (error) {
      next(error);
    }
  }

  async findAllUser(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.findAllUser();
      res.json(users);
      next();
    } catch (error) {
      next(error);
    }
  }
}
