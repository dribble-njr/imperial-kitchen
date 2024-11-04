import { IsEmail } from 'class-validator';

export class CaptchaDto {
  @IsEmail()
  email: string;
}
