export interface CreateUserData {
  name: string;
  email?: string;
  phone?: string;
  password: string;
  role?: 'ADMIN' | 'MEMBER';
}
