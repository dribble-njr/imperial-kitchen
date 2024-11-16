import { SignInDTO, SignInResponseVO } from '@imperial-kitchen/types';
import httpClient from './http-client';

export default class AuthService {
  public static signIn(params: SignInDTO) {
    return httpClient.post<SignInResponseVO, SignInDTO>('/auth/sign-in', params);
  }
}
