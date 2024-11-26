import { RefreshTokenResponseVO, SignInDTO, SignInResponseVO } from '@imperial-kitchen/types';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
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

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await compare(signInDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { sub: user.id, username: user.email };

    return {
      accessToken: await this.jwtService.signAsync(payload, { expiresIn: '1d' }),
      refreshToken: await this.jwtService.signAsync(payload, { expiresIn: '30d' })
    };
  }

  async refreshToken(refreshToken: string): Promise<RefreshTokenResponseVO> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken);
      const newAccessToken = await this.jwtService.signAsync(
        { sub: payload.sub, username: payload.username },
        { expiresIn: '1d' }
      );
      const newRefreshToken = await this.jwtService.signAsync(
        { sub: payload.sub, username: payload.username },
        { expiresIn: '30d' }
      );

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async getUserInfoByToken(token: string) {
    const payload = await this.jwtService.verifyAsync(token);
    return this.prismaService.user.findUnique({
      where: { id: payload.sub }
    });
  }
}
