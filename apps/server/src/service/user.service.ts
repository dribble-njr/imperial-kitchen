import { CommonResponse, ERROR_CODES, Role } from '@imperial-kitchen/types';
import { UserDao } from '../dao/user.dao.ts';
import { AppError } from '../lib/index.ts';
import { MailClient, RedisClient } from '../lib/index.ts';
import { LoginUserDto, RegisterAdminDto, RegisterMemberDto } from '../type/dto/index.ts';
import { comparePassword, generateCaptchaHtml, generateRandomCode, hashPassword } from '../util/index.ts';

export default class UserService {
  private userDao: UserDao;
  private redisClient: RedisClient;
  private mailClient: MailClient;

  constructor() {
    this.userDao = new UserDao();
    this.redisClient = RedisClient.getInstance();
    this.mailClient = MailClient.getInstance();
  }

  /**
   * register user, create family or join family according by the second parameter
   * @param user
   * @param createFamily is create family or join family
   * @returns
   */
  async registerUser(user: RegisterAdminDto | RegisterMemberDto, createFamily: boolean) {
    // validate captcha
    const captcha = await this.redisClient.get(`captcha_${user.email}`);
    if (!captcha) {
      throw new AppError({ message: ERROR_CODES.CAPTCHA_EXPIRED, code: 401 });
    }
    if (captcha !== user.captcha) {
      throw new AppError({ message: ERROR_CODES.CAPTCHA_ERROR, code: 400 });
    }

    const { email, name, password } = user;

    // validate user exists
    const existingUser = await this.userDao.findUserByEmailOrPhone({ email });
    if (existingUser) {
      throw new AppError({ message: ERROR_CODES.USER_EXISTS, code: 409 });
    }

    // create user
    const hashedPassword = await hashPassword(password);
    const newUser = await this.userDao.createUser({
      email,
      name,
      password: hashedPassword
    });

    // create or find existing family
    let newFamily;
    if (createFamily && 'familyName' in user) {
      newFamily = await this.createFamily(user.familyName, newUser.id);
    }
    if (!createFamily && 'inviteCode' in user) {
      newFamily = await this.findFamilyByInviteCode(user.inviteCode);
    }

    if (!newFamily) {
      throw new Error();
    }

    // join family
    const newFamilyOnUsers = await this.userDao.createFamilyOnUsers({
      userId: newUser.id,
      familyId: newFamily.id,
      role: createFamily ? Role.ADMIN : Role.MEMBER
    });

    return {
      code: 200,
      message: 'Success',
      data: newFamilyOnUsers
    };
  }

  private async createFamily(familyName: string, adminId: number) {
    const inviteCode = generateRandomCode();
    const newFamily = await this.userDao.createFamily({
      name: familyName,
      adminId,
      inviteCode
    });
    return newFamily;
  }

  private async findFamilyByInviteCode(inviteCode: string) {
    const family = await this.userDao.findFamilyByInviteCode(inviteCode);
    return family;
  }

  /**
   * send captcha to user's email
   * @param address
   * @returns
   */
  async captcha(address: string): Promise<CommonResponse<boolean | null>> {
    const code = Math.random().toString().slice(2, 8);

    await this.redisClient.set(`captcha_${address}`, code, 5 * 60);

    await this.mailClient.sendEmail({
      to: address,
      subject: '注册验证码',
      html: generateCaptchaHtml(code)
    });
    return { code: 200, message: 'Success', data: true };
  }

  async login(data: LoginUserDto) {
    const user = await this.userDao.findUserByName(data.name);
    if (!user) {
      throw new AppError({ message: ERROR_CODES.USER_NOT_FOUND, code: 401 });
    }
    const isPasswordValid = await comparePassword(data.password, user.password);
    if (isPasswordValid) {
      throw new AppError({ message: ERROR_CODES.INVALID_PASSWORD, code: 401 });
    }

    return user;
  }
}
