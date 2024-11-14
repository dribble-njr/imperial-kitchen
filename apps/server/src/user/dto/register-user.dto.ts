import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty({
    message: 'Username is required'
  })
  name: string;

  @IsEmail()
  @IsNotEmpty({
    message: 'Email is required'
  })
  email: string;

  @IsNotEmpty({
    message: 'Password is required'
  })
  @MinLength(6, {
    message: 'Password length must be greater than 6'
  })
  password: string;

  @IsNotEmpty({
    message: 'Captcha is required'
  })
  captcha: string;
}

export class RegisterAdminDto extends RegisterUserDto {
  @IsNotEmpty({
    message: 'Kitchen name is required'
  })
  kitchenName: string;
}

export class RegisterMemberDto extends RegisterUserDto {
  @IsNotEmpty({
    message: 'Invite code is required'
  })
  inviteCode: string;
}
