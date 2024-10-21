import { CommonResponse } from '@imperial-kitchen/types';
import { UserDao } from '../dao/user-dao';
import { AppError, ERROR_CODES } from '../errors';
import redisService from './redis-service';
import emailService from './email-service';
import { md5 } from '../util';
import { RegisterUserDto, LoginUserDto } from '../dto';

export default class UserService {
  private userDao: UserDao;
  private redisService;
  private emailService;

  constructor() {
    this.userDao = new UserDao();
    this.redisService = redisService;
    this.emailService = emailService;
  }

  async registerAdmin(data: RegisterUserDto): Promise<CommonResponse<boolean | null>> {
    const { name, password, email } = data;
    const user = await this.userDao.findUserByEmailOrPhone(email);
    console.log(user, 'registerAdmin');
    if (user) {
      throw new AppError(ERROR_CODES.USER_EXISTS, 409);
    }

    const newUser = await this.userDao.createUser({
      name,
      password,
      email,
      phone,
      role: 'ADMIN'
    });

    console.log(newUser, 'registerAdmin');

    return {
      code: 200,
      message: 'success',
      data: true
    };
  }

  async register(user: RegisterUserDto): Promise<CommonResponse<boolean | null>> {
    const captcha = await this.redisService.get(`captcha_${user.email}`);
    if (!captcha) {
      throw new AppError(ERROR_CODES.CAPTCHA_EXPIRED, 400);
    }
    if (captcha !== user.captcha) {
      throw new AppError(ERROR_CODES.CAPTCHA_ERROR, 400);
    }

    console.log(
      await this.userDao.createUser({
        name: user.name,
        password: md5(user.password),
        email: user.email,
        role: 'MEMBER'
      }),
      'register'
    );

    return {
      code: 200,
      message: 'success',
      data: true
    };
  }

  async captcha(address: string): Promise<CommonResponse<boolean | null>> {
    try {
      const code = Math.random().toString().slice(2, 8);

      await this.redisService.set(`captcha_${address}`, code, 5 * 60);

      await this.emailService.sendEmail({
        to: address,
        subject: '注册验证码',
        html: `<p>你的注册验证码是 ${code}</p>`
      });
      return { code: 200, message: 'success', data: true };
    } catch (error) {
      throw new AppError('发送失败', 500);
    }
  }

  async login(data: LoginUserDto) {
    const user = await this.userDao.findUserByName(data.name);
    if (!user) {
      throw new AppError(ERROR_CODES.USER_NOT_FOUND, 400);
    }
    if (md5(data.password) !== user.password) {
      throw new AppError(ERROR_CODES.INVALID_PASSWORD, 400);
    }
    const vo = {};
    // vo.userInfo = {
    //   id: user.id,
    //   name: user.name,
    //   email: user.email,
    //   phone: user.phone ? user.phone : undefined,
    //   createdAt: user.createdAt,
    //   role: user.role
    // };
    return vo;
  }

  async findAllUser() {
    return await this.userDao.findAllUser();
  }

  async findUserById(id: number) {
    const user = await this.userDao.findUserById(id);
    if (!user) {
      throw new AppError(ERROR_CODES.USER_NOT_FOUND, 400);
    }
    const vo = {};
    // vo.userInfo = {
    //   id: user.id,
    //   name: user.name,
    //   email: user.email,
    //   phone: user.phone ? user.phone : undefined,
    //   createdAt: user.createdAt,
    //   role: user.role
    // };
    return vo;
  }
}
