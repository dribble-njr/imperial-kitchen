import { User } from '../user/user.vo';

export interface SignInResponseVO {
  accessToken: string;
  refreshToken: string;
  user: Omit<User, 'role'>;
}

export interface RefreshTokenResponseVO {
  accessToken: string;
  refreshToken: string;
}
