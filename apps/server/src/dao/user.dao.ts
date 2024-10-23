import prisma from './index.ts';
import { RegisterAdminDto, RegisterMemberDto } from '../dto/index.ts';

export class UserDao {
  constructor() {}

  async findUserByEmailOrPhone({ email, phone }: { email?: string; phone?: string }) {
    return await prisma.user.findFirst({
      where: {
        OR: [{ email: email || undefined }, { phone: phone || undefined }]
      }
    });
  }

  async createUser(data: RegisterAdminDto | RegisterMemberDto) {
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
