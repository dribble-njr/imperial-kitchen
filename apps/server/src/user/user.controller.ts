import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterAdminDto, RegisterMemberDto } from './dto/register-user.dto';
import { TransformResponseInterceptor } from 'src/common/interceptors/transform-response.interceptor';
import { CaptchaDto } from './dto/captcha.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('user')
@UseInterceptors(TransformResponseInterceptor)
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.getUserById(Number(id));
    return user;
  }

  @Public()
  @Post('register/admin')
  async registerAdmin(@Body() body: RegisterAdminDto) {
    console.log(body, 'body');
    const data = await this.userService.registerUser(body, true);
    return data;
  }

  @Public()
  @Post('register/member')
  async registerMember(@Body() body: RegisterMemberDto) {
    const data = await this.userService.registerUser(body, false);
    return data;
  }

  @Public()
  @Get('register/captcha')
  async captcha(@Query() query: CaptchaDto) {
    const data = await this.userService.captcha(query.email);
    return data;
  }
}
