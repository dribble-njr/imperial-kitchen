import querystring from 'node:querystring';
import { CustomIncomingMessage } from './types.ts';
import * as crypto from 'crypto';

/**
 * Extracts query parameters from a URL string.
 *
 * @param {string | undefined} url - The URL string from which to extract query parameters.
 * @return {Record<string, string>} An object containing the extracted query parameters.
 */
export const getQueryParams = (url: string | undefined) => {
  if (!url) return {};

  const query = url.split('?')[1];

  return querystring.parse(query);
};

/**
 * A function to retrieve the request body data asynchronously.
 *
 * @param {CustomIncomingMessage} req - The incoming message object containing the request data.
 * @return {Promise<T>} A promise resolving to the parsed request body data.
 */
export const getRequestBody = <T>(req: CustomIncomingMessage): Promise<T> => {
  return new Promise((resolve, reject) => {
    try {
      if (req.method !== 'POST' && req.method !== 'PUT') {
        resolve({} as T);
        return;
      }
      if (req.headers['content-type'] !== 'application/json') {
        resolve({} as T);
        return;
      }
      let postData = '';
      req.on('data', (chunk: Buffer) => {
        postData += chunk.toString();
      });
      req.on('end', () => {
        if (!postData) {
          resolve({} as T);
          return;
        }
        resolve(JSON.parse(postData) as T);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export function md5(str: string) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}
