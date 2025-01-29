import { User } from '../user/user.vo';

export interface SignInResponseVO {
  accessToken: string;
  refreshToken: string;
  userInfo: User;
}

export interface RefreshTokenResponseVO {
  accessToken: string;
  refreshToken: string;
}
