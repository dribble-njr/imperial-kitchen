import httpClient from './http-client';
import { RegisterAdminDTO, RegisterMemberDTO, RegisterVO } from '@/types';

export default class UserService {
  public static registerAdmin(params: RegisterAdminDTO) {
    return httpClient.post<RegisterVO, RegisterAdminDTO>('/user/register/admin', params);
  }

  public static registerMember(params: RegisterMemberDTO) {
    return httpClient.post<boolean, RegisterMemberDTO>('/user/register/member', params);
  }

  public static sendCaptcha(email: string) {
    return httpClient.get<boolean, { email: string }>(`/user/register/captcha?email=${email}`);
  }
}
