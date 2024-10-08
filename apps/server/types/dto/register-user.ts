export interface RegisterUserDto {
  name: string;
  email: string;
  password: string;
  captcha: string;
  role?: 'ADMIN' | 'MEMBER';
}
