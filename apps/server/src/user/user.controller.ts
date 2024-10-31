import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseInterceptors
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterAdminDto, RegisterMemberDto } from './dto/register-user.dto';
import { ERROR_CODES } from '@imperial-kitchen/types';
import { TransformResponseInterceptor } from 'src/common/interceptors/transform-response.interceptor';

@Controller('user')
@UseInterceptors(TransformResponseInterceptor)
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: string) {
    const user = await this.userService.getUserById(Number(id));
    return user;
  }

  @Post('register/admin')
  async registerAdmin(@Body() body: RegisterAdminDto) {
    const data = await this.userService.registerUser(body, true);
    return data;
  }

  @Post('register/member')
  async registerMember(@Body() body: RegisterMemberDto) {
    const data = await this.userService.registerUser(body, false);
    return data;
  }

  @Get('register/captcha')
  async captcha(@Query('email') email: string) {
    const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!reg.test(email)) {
      throw new BadRequestException(ERROR_CODES.INVALID_EMAIL);
    }

    const data = await this.userService.captcha(email);
    return data;
  }
}
