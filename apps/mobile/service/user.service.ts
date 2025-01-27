import httpClient from './http-client';
import { CaptchaDTO, RegisterAdminDTO, RegisterMemberDTO, RegisterVO } from '@/types';

export default class UserService {
  public static registerAdmin(params: RegisterAdminDTO) {
    return httpClient.post<RegisterVO, RegisterAdminDTO>('/user/register/admin', params);
  }

  public static registerMember(params: RegisterMemberDTO) {
    return httpClient.post<boolean, RegisterMemberDTO>('/user/register/member', params);
  }

  public static sendCaptcha(params: CaptchaDTO) {
    return httpClient.get<boolean, CaptchaDTO>(`/user/register/captcha?email=${params.email}&type=${params.type}`);
  }
}
