import { Response } from '@imperial-kitchen/types';
import { ServerResponse } from 'node:http';

export abstract class BaseController {
  protected static sendResponse(statusCode: number, data: unknown, res: ServerResponse) {
    res.setHeader('content-type', 'application/json');
    res.writeHead(statusCode);
    const response: Response = {
      code: statusCode,
      message: 'OK',
      data
    };
    res.write(JSON.stringify(response));
    res.end();
  }

  protected sendError(statusCode: number, message: string, res: ServerResponse) {
    res.setHeader('content-type', 'application/json');
    res.writeHead(statusCode);
    const response: Response = {
      code: statusCode,
      message: JSON.stringify({ error: message })
    };
    res.write(response);
    res.end();
  }
}
