import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({
    message: '用户名不能为空'
  })
  name: string;

  @IsNotEmpty({
    message: '密码不能为空'
  })
  @MinLength(6, {
    message: '密码长度不能小于6位'
  })
  password: string;
}

export interface RegisterUserDto {
  name: string;
  email: string;
  password: string;
  captcha: string;
  role?: 'ADMIN' | 'MEMBER';
}
