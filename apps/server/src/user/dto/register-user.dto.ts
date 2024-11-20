import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterUserDTO {
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

export class RegisterAdminDTO extends RegisterUserDTO {
  @IsNotEmpty({
    message: 'Kitchen name is required'
  })
  kitchenName: string;
}

export class RegisterMemberDTO extends RegisterUserDTO {
  @IsNotEmpty({
    message: 'Invite code is required'
  })
  inviteCode: string;
}
