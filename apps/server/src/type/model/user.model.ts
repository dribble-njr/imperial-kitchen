export interface UserCreateInput {
  email: string;
  phone?: string;
  name: string;
  password: string;
}

export interface KitchenCreateInput {
  name: string;
  adminId: number;
  inviteCode: string;
}

export interface KitchensOnUsersCreateInput {
  userId: number;
  kitchenId: number;
  role: string;
}
