import { createHash, randomBytes } from 'node:crypto';
import { compare, hash } from 'bcrypt';

export function generateRandomCode() {
  return randomBytes(16).toString('hex');
}

export function md5(str: string) {
  const hash = createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}

export async function hashPassword(password: string) {
  const saltRounds = 10;
  return hash(password, saltRounds);
}

export async function comparePassword(password: string, hashedPassword: string) {
  return compare(password, hashedPassword);
}
