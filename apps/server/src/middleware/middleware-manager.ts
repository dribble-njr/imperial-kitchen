import { ServerResponse } from 'node:http';
import { CustomIncomingMessage, Middleware } from '../types';

/**
 * Manage the execution order of middleware functions.
 * It allows you to add multiple middleware functions to a queue
 * and execute them sequentially during a request.
 *
 * @export
 * @class MiddlewareManager
 */
export default class MiddlewareManager {
  private readonly middlewares: Middleware[];

  constructor() {
    this.middlewares = [];
  }

  use(func: Middleware) {
    this.middlewares.push(func);
  }

  run(req: CustomIncomingMessage, res: ServerResponse) {
    const runner = async (index: number) => {
      const middleware = this.middlewares[index];
      if (middleware) {
        await middleware(req, res, () => {
          return runner(index + 1);
        });
      }
    };

    runner(0);
  }
}
