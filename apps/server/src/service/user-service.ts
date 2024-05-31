import { BaseService } from './base-service';
import { User, SignInParams } from '@imperial-kitchen/types';

export class UserService extends BaseService {
  constructor() {
    super();
  }

  // sign-in
  async signIn(data: SignInParams) {
    const sql = 'SELECT * FROM users WHERE name = ?';
    const res = await this.db.execute({ sql, args: [data.name] });
    const usersInfo: User[] = res.rows.map((row) => ({
      id: Number(row.ID),
      name: String(row.name),
      password: String(row.password)
    }));

    // Check if the user exists.
    if (usersInfo.length === 0) {
      return { code: 401, message: 'Access to the requested resource is unauthorized. Please authenticate.' };
    }
    // Check if the password matches.
    if (usersInfo[0].password !== data.password) {
      return { code: 401, message: 'Access to the requested resource is unauthorized. Please authenticate.' };
    }

    // All checks passed, return success message or token
    // TODO: generate token.
    return { code: 200, message: 'Login successful' };
  }
}
