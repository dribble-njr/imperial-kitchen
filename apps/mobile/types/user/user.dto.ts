export interface RegisterAdminDTO {
  name: string;
  email: string;
  captcha: string;
  password: string;
  kitchenName: string;
}

export interface RegisterMemberDTO {
  name: string;
  email: string;
  captcha: string;
  password: string;
  inviteCode: string;
}

export type RegisterUserDTO = RegisterAdminDTO | RegisterMemberDTO;

export interface CaptchaDTO {
  email: string;
  type: CaptchaType;
}

export enum CaptchaType {
  REGISTER = 'register',
  RESET_PASSWORD = 'reset_password'
}
