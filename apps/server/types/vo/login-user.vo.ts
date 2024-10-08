class UserInfo {
  id: number;
  name: string;
  email: string;
  phone?: string;
  createdAt: Date;
  role: string;
}

export class LoginUserVo {
  userInfo: UserInfo;
  accessToken: string;
  refreshToken: string;
}
