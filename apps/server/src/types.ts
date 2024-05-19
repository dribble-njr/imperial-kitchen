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
