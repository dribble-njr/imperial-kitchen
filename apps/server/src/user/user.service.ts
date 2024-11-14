import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterAdminDto, RegisterMemberDto } from './dto/register-user.dto';
import { ERROR_CODES, Role } from '@imperial-kitchen/types';
import { generateCaptchaHtml, generateRandomCode, hashPassword } from 'src/util';
import { RedisService } from 'src/shared/redis.service';
import { MailService } from 'src/shared/mail.service';
import { PrismaService } from 'src/shared/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private redisService: RedisService,
    private mailService: MailService,
    private prismaService: PrismaService
  ) {}

  async getUserById(id: number) {
    return this.prismaService.user.findUnique({
      where: {
        id
      }
    });
  }

  async getUserByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email
      }
    });
  }

  /**
   * register user, create kitchen or join kitchen according by the second parameter
   * @param user
   * @param createKitchen is create kitchen or join kitchen
   * @returns
   */
  async registerUser(user: RegisterAdminDto | RegisterMemberDto, createKitchen: boolean) {
    // validate captcha
    const captcha = await this.redisService.get(`captcha_${user.email}`);
    if (!captcha) {
      throw new HttpException(ERROR_CODES.CAPTCHA_EXPIRED, HttpStatus.UNAUTHORIZED);
    }
    if (captcha !== user.captcha) {
      throw new HttpException(ERROR_CODES.CAPTCHA_ERROR, HttpStatus.BAD_REQUEST);
    }

    const { email, name, password } = user;

    // validate user exists
    const time = new Date().getTime();
    const existingUser = await this.prismaService.user.findFirst({
      where: {
        OR: [{ email: email || undefined }]
      }
    });
    const time2 = new Date().getTime();
    console.log('time2', time2 - time);
    if (existingUser) {
      throw new HttpException(ERROR_CODES.USER_EXISTS, HttpStatus.CONFLICT);
    }
    return this.prismaService.$transaction(async (tx) => {
      // 1. create user
      const hashedPassword = await hashPassword(password);
      const newUser = await tx.user.create({
        data: {
          email,
          name,
          password: hashedPassword
        }
      });
      const time3 = new Date().getTime();
      console.log('time3', time3 - time2);
      // 2. create or find existing kitchen
      let newKitchen;
      if (createKitchen && 'kitchenName' in user) {
        // newKitchen = await this.createKitchen(user.kitchenName, newUser.id);
        newKitchen = await tx.kitchen.create({
          data: {
            name: user.kitchenName,
            adminId: newUser.id,
            inviteCode: generateRandomCode()
          }
        });
      }
      const time4 = new Date().getTime();
      console.log('time4', time4 - time3);
      if (!createKitchen && 'inviteCode' in user) {
        newKitchen = await tx.kitchen.findFirst({
          where: {
            inviteCode: user.inviteCode
          }
        });
      }
      if (!newKitchen) {
        throw new HttpException(ERROR_CODES.KITCHEN_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      const time5 = new Date().getTime();
      console.log('time5', time5 - time4);

      // 3. join kitchen
      const newKitchenOnUsers = await tx.kitchensOnUsers.create({
        data: {
          userId: newUser.id,
          kitchenId: newKitchen.id,
          role: createKitchen ? Role.ADMIN : Role.MEMBER
        }
      });

      return newKitchenOnUsers;
    });
  }

  /**
   * send captcha to user's email
   * @param email
   * @returns
   */
  async captcha(email: string) {
    const code = Math.random().toString().slice(2, 8);

    await this.redisService.set(`captcha_${email}`, code, 5 * 60);

    this.mailService.sendEmail({
      to: email,
      subject: '注册验证码',
      html: generateCaptchaHtml(code)
    });
    return true;
  }
}
