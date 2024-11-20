import { IsNotEmpty, MinLength } from 'class-validator';

export class SignInDTO {
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
}
