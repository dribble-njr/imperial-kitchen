import { SignInDto, SignInResponseVo } from '@imperial-kitchen/types';
import httpClient from './http-client';

export default class AuthService {
  public static signIn(params: SignInDto) {
    return httpClient.post<SignInResponseVo, SignInDto>('/auth/sign-in', params);
  }
}
