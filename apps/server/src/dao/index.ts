import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';
import config from '../config/index.js';

const libsql = createClient({
  url: config.DB_URL,
  authToken: config.DB_TOKEN
});

const adapter = new PrismaLibSQL(libsql);
const prisma = new PrismaClient({ adapter });

export default prisma;
