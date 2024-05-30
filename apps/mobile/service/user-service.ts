import { SignInParams } from '@imperial-kitchen/types';
import httpClient from './http-client';

class UserService {
  public static signIn(name: string, password: string) {
    return httpClient.post<boolean, SignInParams>('/user/sign-in', { name, password });
  }
}

export default UserService;
