import httpClient from './http-client';
import {
  CaptchaDTO,
  RegisterAdminDTO,
  RegisterMemberDTO,
  RegisterUserDTO,
  RegisterVO,
  SignInResponseVO,
  VerifyCaptchaDTO
} from '@/types';

export default class UserService {
  public static registerAdmin(params: RegisterAdminDTO) {
    return httpClient.post<RegisterVO, RegisterAdminDTO>('/user/register/admin', params);
  }

  public static registerMember(params: RegisterMemberDTO) {
    return httpClient.post<boolean, RegisterMemberDTO>('/user/register/member', params);
  }

  public static sendCaptcha(params: CaptchaDTO) {
    return httpClient.get<boolean, CaptchaDTO>(`/user/captcha?email=${params.email}&type=${params.type}`);
  }

  public static verifyCaptcha(params: VerifyCaptchaDTO) {
    return httpClient.post<boolean, VerifyCaptchaDTO>('/user/captcha/verify', params);
  }

  public static registerUser(params: RegisterUserDTO) {
    return httpClient.post<SignInResponseVO, RegisterUserDTO>('/user', params);
  }
}
