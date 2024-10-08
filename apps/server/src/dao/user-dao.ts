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
    try {
      return await prisma.user.create({
        data
      });
    } catch (error) {
      console.log(error);
    }
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
}
