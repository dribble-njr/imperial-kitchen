import { CommonResponse } from '@imperial-kitchen/types';
import { ServerResponse } from 'node:http';

export abstract class BaseController {
  protected static sendResponse(statusCode: number, data: unknown, res: ServerResponse) {
    res.setHeader('content-type', 'application/json');
    res.writeHead(statusCode);

    // handle bigint
    let responseData: unknown;
    if (typeof data === 'bigint') {
      if (data <= Number.MAX_SAFE_INTEGER && data >= Number.MIN_SAFE_INTEGER) {
        responseData = Number(data);
      } else {
        responseData = data.toString();
      }
    } else {
      responseData = data;
    }

    const response: CommonResponse = {
      code: statusCode,
      message: 'OK',
      data: responseData
    };

    res.write(JSON.stringify(response));
    res.end();
  }

  protected sendError(statusCode: number, message: string, res: ServerResponse) {
    res.setHeader('content-type', 'application/json');
    res.writeHead(statusCode);
    const response: CommonResponse = {
      code: statusCode,
      message: JSON.stringify({ error: message })
    };
    res.write(response);
    res.end();
  }
}
