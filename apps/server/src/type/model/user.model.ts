export interface UserCreateInput {
  email: string;
  phone?: string;
  name: string;
  password: string;
}

export interface FamilyCreateInput {
  name: string;
  adminId: number;
  inviteCode: string;
}

export interface FamiliesOnUsersCreateInput {
  userId: number;
  familyId: number;
  role: string;
}
