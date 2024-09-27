import dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT || 8000,
  DB_URL: process.env.DB_URI || '',
  DB_TOKEN: process.env.DB_TOKEN || ''
};

export default config;
