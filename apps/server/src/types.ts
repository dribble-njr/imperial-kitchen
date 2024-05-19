/*
 * @Author: yanfan
 * @Date: 2024-05-18 14:05:52
 * @LastEditTime: 2024-05-18 17:01:07
 */
import { IncomingMessage, ServerResponse } from 'node:http';

export interface Route {
  controller: Controller;
  middlewares?: Middleware[];
}

export type Controller = (req: IncomingMessage, res: ServerResponse) => void;

export type Middleware = (req: IncomingMessage, res: ServerResponse, next: Middleware) => void;

export interface LoginParmas {
  name: string;
  password: string;
}
