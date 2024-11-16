import { IsEmail } from 'class-validator';

export class CaptchaDTO {
  @IsEmail()
  email: string;
}
