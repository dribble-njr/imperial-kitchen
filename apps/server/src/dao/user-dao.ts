import prisma from '.';
import { CreateUserData } from '../../types/user';

export class UserDao {
  constructor() {}

  async findUserByEmailOrPhone(email?: string, phone?: string) {
    return await prisma.user.findFirst({
      where: {
        OR: [{ email: email || undefined }, { phone: phone || undefined }]
      }
    });
  }

  async createUser(data: CreateUserData) {
    return await prisma.user.create({
      data
    });
  }
}
