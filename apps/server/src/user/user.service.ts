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
   * register user, create family or join family according by the second parameter
   * @param user
   * @param createFamily is create family or join family
   * @returns
   */
  async registerUser(user: RegisterAdminDto | RegisterMemberDto, createFamily: boolean) {
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
    const existingUser = await this.prismaService.user.findFirst({
      where: {
        OR: [{ email: email || undefined }]
      }
    });
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

      // 2. create or find existing family
      let newFamily;
      if (createFamily && 'familyName' in user) {
        newFamily = await this.createFamily(user.familyName, newUser.id);
      }
      if (!createFamily && 'inviteCode' in user) {
        newFamily = await this.findFamilyByInviteCode(user.inviteCode);
      }
      if (!newFamily) {
        throw new HttpException(ERROR_CODES.FAMILY_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      // 3. join family
      const newFamilyOnUsers = await tx.familiesOnUsers.create({
        data: {
          userId: newUser.id,
          familyId: newFamily.id,
          role: createFamily ? Role.ADMIN : Role.MEMBER
        }
      });

      return newFamilyOnUsers;
    });
  }

  private async createFamily(familyName: string, adminId: number) {
    const inviteCode = generateRandomCode();
    const newFamily = await this.prismaService.family.create({
      data: {
        name: familyName,
        adminId,
        inviteCode
      }
    });
    return newFamily;
  }

  private async findFamilyByInviteCode(inviteCode: string) {
    const family = await this.prismaService.family.findFirst({
      where: {
        inviteCode
      }
    });
    return family;
  }

  /**
   * send captcha to user's email
   * @param email
   * @returns
   */
  async captcha(email: string) {
    const code = Math.random().toString().slice(2, 8);

    await this.redisService.set(`captcha_${email}`, code, 5 * 60);

    await this.mailService.sendEmail({
      to: email,
      subject: '注册验证码',
      html: generateCaptchaHtml(code)
    });
    return true;
  }
}
