import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({
    message: 'Username is required'
  })
  name: string;

  @IsNotEmpty({
    message: 'Password is required'
  })
  @MinLength(6, {
    message: 'Password length must be greater than 6'
  })
  password: string;
}
