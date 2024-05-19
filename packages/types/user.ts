export interface User {
  id: number;
  name: string;
  password: string;
}

export interface SignInParams {
  name: string;
  password: string;
}
