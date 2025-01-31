import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { CaptchaDTO } from './dto/captcha.dto';
import { RegisterAdminDTO, RegisterMemberDTO } from './dto/register-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.getUserById(Number(id));
    return user;
  }

  @Public()
  @Post('register/admin')
  async registerAdmin(@Body() body: RegisterAdminDTO) {
    console.log(body, 'body');
    const data = await this.userService.registerUser(body, true);
    return data;
  }

  @Public()
  @Post('register/member')
  async registerMember(@Body() body: RegisterMemberDTO) {
    const data = await this.userService.registerUser(body, false);
    return data;
  }

  @Public()
  @Get('register/captcha')
  async captcha(@Query() query: CaptchaDTO) {
    const data = await this.userService.captcha(query.email);
    return data;
  }
}
