import { RefreshTokenResponseVO, SignInDTO, SignInResponseVO } from '@imperial-kitchen/types';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/shared/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private prismaService: PrismaService
  ) {}

  async signIn(signInDto: SignInDTO): Promise<SignInResponseVO> {
    const user = await this.userService.getUserByEmail(signInDto.email);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await compare(signInDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const accessTokenPayload = { id: user.id, email: user.email, nonce: randomUUID() };
    const refreshTokenPayload = { id: user.id, email: user.email, nonce: randomUUID() };

    return {
      accessToken: await this.jwtService.signAsync(accessTokenPayload, { expiresIn: '1d' }),
      refreshToken: await this.jwtService.signAsync(refreshTokenPayload, { expiresIn: '30d' }),
      userInfo: {
        ...userWithoutPassword
      }
    };
  }

  async refreshToken(refreshToken: string): Promise<RefreshTokenResponseVO> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken);
      const newAccessToken = await this.jwtService.signAsync(
        { id: payload.id, email: payload.email, nonce: randomUUID() },
        { expiresIn: '1d' }
      );
      const newRefreshToken = await this.jwtService.signAsync(
        { id: payload.id, email: payload.email, nonce: randomUUID() },
        { expiresIn: '30d' }
      );

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
