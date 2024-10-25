import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ERROR_CODES } from '@imperial-kitchen/types';

import { BaseController } from './base.controller.ts';
import { UserService } from '../service/index.ts';
import { generateToken } from '../middleware/auth.middleware.ts';
import config from '../config/index.ts';
import { AppError } from '../lib/index.ts';
import { LoginUserDto, RegisterAdminDto, RegisterMemberDto } from '../type/dto/index.ts';

export default class UserController extends BaseController {
  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  async registerAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.userService.registerUser(req.body as RegisterAdminDto, true);
      res.json(data);
      next();
    } catch (error) {
      next(error);
    }
  }

  async registerMember(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userService.registerUser(req.body as RegisterMemberDto, false);
      res.json(user);
      next();
    } catch (error) {
      next(error);
    }
  }

  async captcha(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.query, 'captcha');
      if (req.query.email) {
        res.json(await this.userService.captcha(req.query.email as string));
        next();
      } else {
        next(new AppError({ message: ERROR_CODES.EMAIL_IS_REQUIRED, code: 400 }));
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

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await this.userService.getUserById(Number(req.params.id)));
      next();
    } catch (error) {
      next(error);
    }
  }
}
