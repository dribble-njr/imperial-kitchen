import httpClient from './http-client';
import { RegisterAdminDTO } from '@imperial-kitchen/types';

export default class UserService {
  public static registerAdmin(params: RegisterAdminDTO) {
    return httpClient.post<boolean, RegisterAdminDTO>('/user/register/admin', params);
  }

  public static sendCaptcha(email: string) {
    return httpClient.get<boolean, { email: string }>(`/user/register/captcha?email=${email}`);
  }
}
