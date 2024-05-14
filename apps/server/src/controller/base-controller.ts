import { ServerResponse } from 'node:http';

export class BaseController {
  protected static sendResponse(statusCode: number, data: any, res: ServerResponse) {
    res.setHeader('content-type', 'application/json');
    res.writeHead(statusCode);
    res.write(JSON.stringify(data));
    res.end();
  }

  protected sendError(statusCode: number, message: string, res: ServerResponse) {
    res.setHeader('content-type', 'application/json');
    res.writeHead(statusCode);
    res.write(JSON.stringify({ error: message }));
    res.end();
  }
}
