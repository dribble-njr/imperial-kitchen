/*
 * @Author: yanfan
 * @Date: 2024-05-18 14:25:53
 * @LastEditTime: 2024-05-18 17:08:59
 */
export interface User {
  id: number;
  name: string;
  password: string;
}

export interface LoginParmas {
  name: string;
  password: string;
}
