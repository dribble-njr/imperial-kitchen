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
      throw new HttpException(
        { error: ERROR_CODES.CAPTCHA_EXPIRED, code: HttpStatus.UNAUTHORIZED },
        HttpStatus.UNAUTHORIZED
      );
    }
    if (captcha !== user.captcha) {
      throw new HttpException(
        { error: ERROR_CODES.CAPTCHA_ERROR, code: HttpStatus.BAD_REQUEST },
        HttpStatus.BAD_REQUEST
      );
    }

    const { email, name, password } = user;

    // validate user exists
    const existingUser = await this.prismaService.user.findFirst({
      where: {
        OR: [{ email: email || undefined }]
      }
    });
    if (existingUser) {
      throw new HttpException({ error: ERROR_CODES.USER_EXISTS, code: 409 }, HttpStatus.CONFLICT);
    }

    // create user
    const hashedPassword = await hashPassword(password);
    const newUser = await this.prismaService.user.create({
      data: {
        email,
        name,
        password: hashedPassword
      }
    });

    // TODO: add transaction to control the consistency of the data
    console.log(newUser, 'newUser');

    // create or find existing family
    let newFamily;
    if (createFamily && 'familyName' in user) {
      newFamily = await this.createFamily(user.familyName, newUser.id);
    }
    if (!createFamily && 'inviteCode' in user) {
      newFamily = await this.findFamilyByInviteCode(user.inviteCode);
    }

    if (!newFamily) {
      throw new HttpException({ error: 'Family not found', code: HttpStatus.NOT_FOUND }, HttpStatus.NOT_FOUND);
    }

    // join family
    const newFamilyOnUsers = await this.prismaService.familiesOnUsers.create({
      data: {
        userId: newUser.id,
        familyId: newFamily.id,
        role: createFamily ? Role.ADMIN : Role.MEMBER
      }
    });

    return {
      code: 200,
      message: 'Success',
      data: newFamilyOnUsers
    };
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
   * @param address
   * @returns
   */
  async captcha(address: string) {
    const code = Math.random().toString().slice(2, 8);

    await this.redisService.set(`captcha_${address}`, code, 5 * 60);

    await this.mailService.sendEmail({
      to: address,
      subject: '注册验证码',
      html: generateCaptchaHtml(code)
    });
    return { code: 200, message: 'Success', data: true };
  }
}
