import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { RefreshTokenDTO } from './dto/refresh-token.dto';
import { SignInDTO } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('sign-in')
  signIn(@Body() signInDto: SignInDTO) {
    return this.authService.signIn(signInDto);
  }

  @Public()
  @Post('refresh')
  async refreshToken(@Body() { refreshToken }: RefreshTokenDTO) {
    return this.authService.refreshToken(refreshToken);
  }

  @Public()
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
