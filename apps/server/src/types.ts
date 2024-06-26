import { IncomingMessage, ServerResponse } from 'node:http';

export interface Route {
  controller: Controller;
  middlewares?: Middleware[]; // route-specific middleware
}

export type Controller = (req: IncomingMessage, res: ServerResponse) => void;

export type Middleware = (req: IncomingMessage, res: ServerResponse, next: () => void) => void;
