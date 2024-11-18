export interface RegisterAdminDTO {
  name: string;
  email: string;
  captcha: string;
  password: string;
  kitchenName: string;
}

export interface RegisterMemberDto {
  name: string;
  email: string;
  captcha: string;
  password: string;
  inviteCode: string;
}
