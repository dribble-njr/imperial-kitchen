import querystring from 'node:querystring';
import { CustomIncomingMessage } from './types';

export const getQueryParams = (url: string | undefined) => {
  if (!url) return {};

  const query = url.split('?')[1];

  return querystring.parse(query);
};

// get Post data
export const getPostData = <T>(req: CustomIncomingMessage): Promise<T> => {
  return new Promise((resolve, reject) => {
    try {
      if (req.method !== 'POST') {
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
