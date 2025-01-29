import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { RegisterAdminDTO, RegisterMemberDTO } from './dto/register-user.dto';
import { Kitchen } from './entities/kitchen.entity';
import { generateCaptchaHtml, generateRandomCode, hashPassword } from 'src/util';
import { RedisService } from 'src/shared/redis.service';
import { MailService } from 'src/shared/mail.service';
import { PrismaService } from 'src/shared/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import { RegisterUserDTO } from './dto/register-user.dto';
import { CaptchaType, VerifyCaptchaDTO } from './dto/captcha.dto';

@Injectable()
export class UserService {
  constructor(
    private redisService: RedisService,
    private mailService: MailService,
    private prismaService: PrismaService,
    private jwtService: JwtService
  ) {}

  async getUserById(id: number) {
    return this.prismaService.user.findUnique({
      where: {
        id
      }
    });
  }

  async getUserByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  /**
   * register user, create kitchen or join kitchen according by the second parameter
   * @param user
   * @param createKitchen is create kitchen or join kitchen
   * @returns
   */
  async registerUser(user: RegisterAdminDTO | RegisterMemberDTO, createKitchen: boolean) {
    // 检查验证码是否已经验证过
    await this.validateVerifiedCaptcha(user.email, CaptchaType.REGISTER);

    const { email, password } = user;

    // validate user exists
    const existingUser = await this.prismaService.user.findFirst({
      where: {
        OR: [{ email: email || undefined }]
      }
    });
    if (existingUser) {
      throw new ConflictException('User exists');
    }

    return this.prismaService.$transaction(async (tx) => {
      // 1. create user
      const hashedPassword = await hashPassword(password);
      const newUser = await tx.user.create({
        data: {
          email,
          name: email.split('@')[0],
          password: hashedPassword
        }
      });

      // 2. create or find existing kitchen
      let newKitchen: Kitchen;
      if (createKitchen && 'kitchenName' in user) {
        newKitchen = await tx.kitchen.create({
          data: {
            name: user.kitchenName,
            inviteCode: generateRandomCode()
          }
        });
      }
      if (!createKitchen && 'inviteCode' in user) {
        newKitchen = await tx.kitchen.findFirst({
          where: {
            inviteCode: user.inviteCode
          }
        });
      }
      if (!newKitchen) {
        throw new NotFoundException('Kitchen not found');
      }

      // 3. join kitchen
      const newKitchenOnUsers = await tx.kitchensOnUsers.create({
        data: {
          userId: newUser.id,
          kitchenId: newKitchen.id,
          role: createKitchen ? Role.ADMIN : Role.MEMBER
        }
      });

      // 4. generate token
      const accessToken = await this.jwtService.signAsync(
        { id: newUser.id, email: newUser.email },
        { expiresIn: '1d' }
      );
      const refreshToken = await this.jwtService.signAsync(
        { id: newUser.id, email: newUser.email },
        { expiresIn: '30d' }
      );

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userWithoutPassword } = newUser;

      return {
        user: {
          ...userWithoutPassword,
          role: newKitchenOnUsers.role as Role
        },
        kitchen: {
          ...newKitchen,
          inviteCode: newKitchenOnUsers.role === Role.ADMIN ? newKitchen.inviteCode : undefined
        },
        tokens: {
          accessToken,
          refreshToken
        }
      };
    });
  }

  /**
   * send captcha to user's email
   * @param email
   * @param type captcha type
   * @returns
   */
  async captcha(email: string, type: CaptchaType) {
    const code = Math.random().toString().slice(2, 8);

    console.log(code, 'code');

    await this.redisService.set(`captcha_${type}_${email}`, code, 5 * 60);

    const subjects = {
      [CaptchaType.REGISTER]: '注册验证码',
      [CaptchaType.RESET_PASSWORD]: '重置密码验证码'
    };

    this.mailService.sendEmail({
      to: email,
      subject: subjects[type],
      html: generateCaptchaHtml(code)
    });
    return true;
  }

  async verifyCaptcha(body: VerifyCaptchaDTO) {
    const { email, captcha, type } = body;
    const redisKey = `captcha_${type}_${email}`;
    const captchaCode = await this.redisService.get(redisKey);
    if (!captchaCode) {
      throw new UnauthorizedException('验证码过期');
    }
    if (captchaCode !== captcha) {
      throw new BadRequestException('验证码错误');
    }

    // Verified captcha, delay 5 minutes to prevent spam
    await this.redisService.set(`verified_${redisKey}`, 'true', 5 * 60);
    return true;
  }

  async validateVerifiedCaptcha(email: string, type: CaptchaType) {
    const isVerified = await this.redisService.get(`verified_captcha_${type}_${email}`);
    if (!isVerified) {
      throw new UnauthorizedException('请先验证验证码');
    }
  }

  async register(user: RegisterUserDTO) {
    // Check if the verification code has been validated
    await this.validateVerifiedCaptcha(user.email, CaptchaType.REGISTER);

    const { email, password } = user;

    // validate user exists
    const existingUser = await this.prismaService.user.findFirst({
      where: {
        OR: [{ email: email || undefined }]
      }
    });
    if (existingUser) {
      throw new ConflictException('User exists');
    }

    // create user
    const hashedPassword = await hashPassword(password);
    const newUser = await this.prismaService.user.create({
      data: {
        email,
        name: email.split('@')[0],
        password: hashedPassword
      }
    });

    // generate token
    const accessToken = await this.jwtService.signAsync({ id: newUser.id, email: newUser.email }, { expiresIn: '1d' });
    const refreshToken = await this.jwtService.signAsync(
      { id: newUser.id, email: newUser.email },
      { expiresIn: '30d' }
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = newUser;

    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken
    };
  }
}
