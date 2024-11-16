import { Role } from '@prisma/client';

export interface UserCreateInput {
  email: string;
  phone?: string;
  name: string;
  password: string;
}

export interface KitchenCreateInput {
  name: string;
  inviteCode: string;
}

export interface KitchensOnUsersCreateInput {
  userId: number;
  kitchenId: number;
  role: Role;
}
