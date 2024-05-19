import { InStatement, LibsqlError, createClient } from '@libsql/client';

const client = createClient({
  url: process.env.TURSO_URL || '',
  authToken: process.env.TURSO_AUTH_TOKEN
});

export class DB {
  private static instance: DB;

  private constructor() {}

  public static createInstance() {
    if (!DB.instance) {
      DB.instance = new DB();
    }
    return DB.instance;
  }

  public async execute(stmt: InStatement) {
    try {
      const start = Date.now();
      const res = await client.execute(stmt);
      console.log('Query time: ', Date.now() - start);
      return res;
    } catch (error) {
      if (error instanceof LibsqlError) {
        throw new Error(`Execution failed: ${error.message}`);
      } else {
        throw new Error(`An error occurred: ${error}`);
      }
    }
  }
}

export default DB;
