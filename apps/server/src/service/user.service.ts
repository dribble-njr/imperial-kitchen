import { CommonResponse, ERROR_CODES } from '@imperial-kitchen/types';
import { UserDao } from '../dao/user.dao.ts';
import { AppError } from '../lib/index.ts';
import { MailClient, RedisClient } from '../lib/index.ts';
import { md5 } from '../util.ts';
import { RegisterUserDto, LoginUserDto, RegisterAdminDto } from '../type/dto/index.ts';

export default class UserService {
  private userDao: UserDao;
  private redisClient: RedisClient;
  private mailClient: MailClient;

  constructor() {
    this.userDao = new UserDao();
    this.redisClient = RedisClient.getInstance();
    this.mailClient = MailClient.getInstance();
  }

  async registerAdmin(data: RegisterAdminDto): Promise<CommonResponse<boolean | null>> {
    const { email } = data;

    const user = await this.userDao.findUserByEmailOrPhone({ email });
    if (user) {
      throw new AppError({ message: ERROR_CODES.USER_EXISTS, code: 409 });
    }

    const newUser = await this.userDao.createUser(data);

    console.log(newUser, 'registerAdmin');

    return {
      code: 200,
      message: 'success',
      data: true
    };
  }

  async register(user: RegisterUserDto): Promise<CommonResponse<boolean | null>> {
    const captcha = await this.redisClient.get(`captcha_${user.email}`);
    if (!captcha) {
      throw new AppError({ message: ERROR_CODES.CAPTCHA_EXPIRED, code: 400 });
    }
    if (captcha !== user.captcha) {
      throw new AppError({ message: ERROR_CODES.CAPTCHA_ERROR, code: 400 });
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
    const code = Math.random().toString().slice(2, 8);

    await this.redisClient.set(`captcha_${address}`, code, 5 * 60);

    await this.mailClient.sendEmail({
      to: address,
      subject: '注册验证码',
      html: `<p>你的注册验证码是 ${code}</p>`
    });
    return { code: 200, message: 'success', data: true };
  }

  async login(data: LoginUserDto) {
    const user = await this.userDao.findUserByName(data.name);
    if (!user) {
      throw new AppError({ message: ERROR_CODES.USER_NOT_FOUND, code: 400 });
    }
    if (md5(data.password) !== user.password) {
      throw new AppError({ message: ERROR_CODES.INVALID_PASSWORD, code: 400 });
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
      throw new AppError({ message: ERROR_CODES.USER_NOT_FOUND, code: 400 });
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
