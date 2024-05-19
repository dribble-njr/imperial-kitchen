import { BaseService } from './base-service';
import { User, LoginParmas } from '@imperial-kitchen/types';

export class UserService extends BaseService {
  constructor() {
    super();
  }

  // sign-in
  async signIn(data: LoginParmas) {
    const sql = 'SELECT * FROM users WHERE name = ?';
    const res = await this.db.execute({ sql, args: [data.name] });
    const usersInfo: User[] = res.rows.map((row) => ({
      id: Number(row.ID),
      name: String(row.name),
      password: String(row.password)
    }));
    // 校验是否有该用户
    if (usersInfo.length === 0) {
      return { code: 0, msg: '用户不存在' };
    }
    // 校验密码是否一致
    if (usersInfo[0].password !== data.password) {
      return { code: 0, msg: '密码错误' };
    }
    // 全部校验通过，拼接数据
    return { code: 200, msg: '登录成功', data: usersInfo[0] };
  }
}
