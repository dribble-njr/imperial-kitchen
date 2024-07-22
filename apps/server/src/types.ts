import { IncomingMessage, ServerResponse } from 'node:http';

export interface Route {
  controller: Controller;
  middlewares?: Middleware[]; // route-specific middleware
}

export interface CustomIncomingMessage extends IncomingMessage {
  params: Record<string, string>;
}

export type Controller = (req: CustomIncomingMessage, res: ServerResponse) => void;

export type Middleware = (req: CustomIncomingMessage, res: ServerResponse, next: () => void) => void;
