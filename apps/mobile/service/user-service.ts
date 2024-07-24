import { SignInParams } from '@imperial-kitchen/types';
import httpClient from './http-client';

export default class UserService {
  public static signIn(name: string, password: string) {
    return httpClient.post<boolean, SignInParams>('/user/sign-in', { name, password });
  }
}
