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

  public static signUpSendCaptcha(phoneNumber: string) {
    return httpClient.post('/auth/sign-up/captcha', { phoneNumber });
  }

  public static verifySignUpCaptcha(params: { phoneNumber: string; captcha: string }) {
    return httpClient.post('/auth/sign-up/verify-captcha', params);
  }

  public static forgotPasswordSendCaptcha(phoneNumber: string) {
    return httpClient.post('/auth/forgot-password/captcha', { phoneNumber });
  }

  public static verifyForgotPasswordCaptcha(params: { phoneNumber: string; captcha: string }) {
    return httpClient.post('/auth/forgot-password/verify-captcha', params);
  }
}
