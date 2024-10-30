import { IsNotEmpty, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty({
    message: '用户名不能为空'
  })
  name: string;

  @IsNotEmpty({
    message: '邮箱不能为空'
  })
  email: string;

  @IsNotEmpty({
    message: '密码不能为空'
  })
  @MinLength(6, {
    message: '密码长度不能小于6位'
  })
  password: string;

  @IsNotEmpty({
    message: '验证码不能为空'
  })
  captcha: string;
}

export class RegisterAdminDto extends RegisterUserDto {
  @IsNotEmpty({
    message: '家庭名称不能为空'
  })
  familyName: string;
}

export class RegisterMemberDto extends RegisterUserDto {
  @IsNotEmpty({
    message: '邀请码不能为空'
  })
  inviteCode: string;
}
