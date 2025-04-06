import { IsEmail, IsEnum, IsString } from 'class-validator';

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

export class VerifyCaptchaDTO {
  @IsEmail()
  email: string;

  @IsString()
  captcha: string;

  @IsEnum(CaptchaType)
  type: CaptchaType;
}
