import 'dotenv/config';

const config = {
  PORT: process.env.PORT || 8000,
  DB_URL: process.env.DB_URL || '',
  NODEMAILER_HOST: process.env.nodemailer_host || '',
  NODEMAILER_AUTH_USER: process.env.nodemailer_auth_user || '',
  NODEMAILER_AUTH_PASS: process.env.nodemailer_auth_pass || '',
  JWT_SECRET: process.env.JWT_SECRET || 'jwt_secret',
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || '',
  REDIS_URL: process.env.REDIS_URL || ''
};

export default config;
