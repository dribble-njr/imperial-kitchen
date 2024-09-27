import dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT || 8000,
  DB_URL: process.env.DB_URL || '',
  DB_TOKEN: process.env.DB_TOKEN || '',
  API_V1: '/v1'
};

export default config;
