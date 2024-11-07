import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(signInDto: SignInDto) {
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
      access_token: await this.jwtService.signAsync(payload, { expiresIn: '1d' }),
      refresh_token: await this.jwtService.signAsync(payload, { expiresIn: '30d' })
    };
  }

  async refreshToken(refreshToken: string) {
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

      return { access_token: newAccessToken, refresh_token: newRefreshToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
