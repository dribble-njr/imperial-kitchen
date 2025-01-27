import { IsEmail, IsEnum } from 'class-validator';

export enum CaptchaType {
  REGISTER = 'register',
  RESET_PASSWORD = 'reset_password'
}

export class CaptchaDTO {
  @IsEmail()
  email: string;

  @IsEnum(CaptchaType)
  type: CaptchaType;
}
