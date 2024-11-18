import { Body, Controller, Get, Post, Request, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/sign-in.dto';
import { Public } from './decorators/public.decorator';
import { TransformResponseInterceptor } from 'src/common/interceptors/transform-response.interceptor';
import { RefreshTokenDTO } from '@imperial-kitchen/types';

@Controller('auth')
@UseInterceptors(TransformResponseInterceptor)
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
