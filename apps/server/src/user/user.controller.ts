import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterAdminDto, RegisterMemberDto } from './dto/register-user.dto';
import { TransformResponseInterceptor } from 'src/common/interceptors/transform-response.interceptor';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { CaptchaDto } from './dto/captcha';

@Controller('user')
@UseInterceptors(TransformResponseInterceptor)
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.getUserById(Number(id));
    return user;
  }

  @Post('register/admin')
  async registerAdmin(@Body(new ValidationPipe()) body: RegisterAdminDto) {
    const data = await this.userService.registerUser(body, true);
    return data;
  }

  @Post('register/member')
  async registerMember(@Body(new ValidationPipe()) body: RegisterMemberDto) {
    const data = await this.userService.registerUser(body, false);
    return data;
  }

  @Get('register/captcha')
  async captcha(@Query(new ValidationPipe()) query: CaptchaDto) {
    const data = await this.userService.captcha(query.email);
    return data;
  }
}
