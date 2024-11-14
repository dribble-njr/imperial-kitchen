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

export interface UserInfo {
  id: number;
  name: string;
  email: string;
  phone?: string;
  createdAt: Date;
  role: Role;
}
