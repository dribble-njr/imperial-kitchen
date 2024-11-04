import { SignInDto } from '@imperial-kitchen/types';
import httpClient from './http-client';

export default class AuthService {
  public static signIn(params: SignInDto) {
    return httpClient.post<boolean, SignInDto>('/auth/login', params);
  }
}
