import httpClient from './http-client';
import { RegisterAdminDto } from '@imperial-kitchen/types';

export default class UserService {
  public static registerAdmin(params: RegisterAdminDto) {
    return httpClient.post<boolean, RegisterAdminDto>('/user/register/admin', params);
  }

  public static sendCaptcha(email: string) {
    return httpClient.get<boolean, { email: string }>(`/user/register/captcha?email=${email}`);
  }
}
