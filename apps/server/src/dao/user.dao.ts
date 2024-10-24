import prisma from './index.ts';
import { FamiliesOnUsersCreateInput, FamilyCreateInput, UserCreateInput } from '../type/model/index.ts';

export class UserDao {
  constructor() {}

  async findUserByEmailOrPhone({ email, phone }: { email?: string; phone?: string }) {
    return await prisma.user.findFirst({
      where: {
        OR: [{ email: email || undefined }, { phone: phone || undefined }]
      }
    });
  }

  async createUser(data: UserCreateInput) {
    return await prisma.user.create({
      data
    });
  }

  async findUserByName(name: string) {
    return await prisma.user.findFirst({
      where: {
        OR: [{ name: name || undefined }]
      }
    });
  }

  async findUserById(id: number) {
    return await prisma.user.findFirst({
      where: {
        OR: [{ id: id }]
      }
    });
  }

  async findAllUser() {
    return await prisma.user.findMany();
  }

  async createFamily(data: FamilyCreateInput) {
    return await prisma.family.create({
      data
    });
  }

  async createFamilyOnUsers(data: FamiliesOnUsersCreateInput) {
    return await prisma.familiesOnUsers.create({
      data
    });
  }

  async findFamilyByInviteCode(inviteCode: string) {
    return await prisma.family.findFirst({
      where: {
        inviteCode
      }
    });
  }
}
