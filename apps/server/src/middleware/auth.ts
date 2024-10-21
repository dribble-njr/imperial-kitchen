// middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/index.ts';

interface JwtUserData {
  id: number;
  name: string;
  role: string;
}

declare module 'express' {
  interface Request {
    user?: JwtUserData;
  }
}
const secret = config.JWT_SECRET;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const generateToken = (message: Record<string, any>, expiresIn: string) => {
  return jwt.sign(message, secret, { expiresIn: expiresIn });
};

const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.statusCode = 400;
    res.json({ message: 'Token is required' });
    res.end();
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jwt.verify(token, secret, (err: any, user: any) => {
      if (err) {
        res.statusCode = 401;
        res.json({ message: 'Invalid token' });
        res.end();
      } else {
        req.user = user;
        next();
      }
    });
  }
};

export default authenticateToken;
