import { RefreshTokenResponseVO, SignInDTO, SignInResponseVO } from '@/types';
import httpClient from './http-client';
import { getStorageItemAsync } from '@/hooks/useStorageState';

export default class AuthService {
  public static signIn(params: SignInDTO) {
    return httpClient.post<SignInResponseVO, SignInDTO>('/auth/sign-in', params);
  }

  public static async refreshToken() {
    const refreshToken = await getStorageItemAsync('refreshToken');
    if (!refreshToken) return;
    return httpClient.post<RefreshTokenResponseVO>('/auth/refresh-token', { refreshToken });
  }
}
