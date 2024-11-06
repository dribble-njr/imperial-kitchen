export interface User {
  id?: number;
  name?: string;
  email: string;
  phone?: string;
  role?: Role;
  createdAt?: string;
  updatedAt?: string;
}

export enum Role {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER'
}

export interface SignInParams {
  name: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email?: string;
  phone?: string;
  password: string;
  familyName?: string;
  inviteCode?: string;
}

export interface UserInfo {
  id: number;
  name: string;
  email: string;
  phone?: string;
  createdAt: Date;
  role: Role;
}

export interface SignInUserVO {
  userInfo: UserInfo;
  accessToken: string;
  refreshToken: string;
}
