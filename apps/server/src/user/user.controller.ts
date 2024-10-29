import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterAdminDto, RegisterMemberDto } from './dto/register-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  getUserById(@Param('id') id: string) {
    const user = this.userService.getUserById(Number(id));
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
    const data = await this.userService.captcha(email);
    return data;
  }
}
