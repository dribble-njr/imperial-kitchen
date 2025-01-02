import { User } from '../user/user.vo';
export interface SignInResponseVO {
  accessToken: string;
  refreshToken: string;
  userInfo: Omit<User, 'role'>;
}

export interface RefreshTokenResponseVO {
  accessToken: string;
  refreshToken: string;
}
