import { RefreshTokenResponseVO } from '../auth/auth.vo';

export enum Role {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER'
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface RegisterVO {
  user: User;
  kitchen: Kitchen;
  tokens: RefreshTokenResponseVO;
}

export interface Kitchen {
  id: number;
  name: string;
  inviteCode?: string; // only for admin
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}
