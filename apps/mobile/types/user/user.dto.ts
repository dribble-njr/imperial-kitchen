export interface RegisterAdminDTO {
  name: string;
  email: string;
  captcha: string;
  password: string;
  kitchenName: string;
}

export interface RegisterMemberDTO {
  name: string;
  email: string;
  captcha: string;
  password: string;
  inviteCode: string;
}
