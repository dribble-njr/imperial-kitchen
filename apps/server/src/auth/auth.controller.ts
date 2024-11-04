import { Body, Controller, Get, Post, Request, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from './decorators/public.decorator';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Public()
  @Post('refresh')
  async refreshToken(@Body(new ValidationPipe()) { refresh_token }: RefreshTokenDto) {
    return this.authService.refreshToken(refresh_token);
  }

  @Public()
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
