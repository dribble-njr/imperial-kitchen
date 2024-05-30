import { Middleware } from '../types';

const corsMiddleware = (options: { origin: string; methods: string; credentials?: boolean }): Middleware => {
  return (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', options.origin);
    res.setHeader('Access-Control-Allow-Methods', options.methods);
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (options.credentials) {
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      res.end();
    } else {
      next();
    }
  };
};

export default corsMiddleware;
