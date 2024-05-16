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

  public async execute(stmt: InStatement): Promise<void> {
    try {
      await client.execute(stmt);
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
