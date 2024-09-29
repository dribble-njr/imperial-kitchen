import { CommonResponse, RegisterRequest } from '@imperial-kitchen/types';
import { UserDao } from '../dao/user-dao';
import { AppError } from '../errors';

export default class UserService {
  private userDao: UserDao;

  constructor() {
    this.userDao = new UserDao();
  }

  async registerAdmin(data: RegisterRequest): Promise<CommonResponse<boolean | null>> {
    const { name, password, email, phone } = data;
    const user = await this.userDao.findUserByEmailOrPhone(email, phone);
    console.log(user, 'registerAdmin');
    if (user) {
      throw new AppError('User already exists with this email or phone number.', 409);
    }

    const newUser = await this.userDao.createUser({
      name,
      password,
      email,
      phone,
      role: 'ADMIN'
    });

    console.log(newUser, 'registerAdmin');

    return {
      code: 200,
      message: 'success',
      data: true
    };
  }
}
