import { IsEmail, IsNotEmpty, MinLength, ValidateIf } from 'class-validator';

export class RegisterUserDTO {
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
    message: 'Confirm password is required'
  })
  @ValidateIf((o) => o.password === o.confirmPassword, {
    message: 'Passwords do not match'
  })
  confirmPassword: string;
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
