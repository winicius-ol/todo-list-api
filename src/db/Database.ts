import { DBAccessor } from './DBAccessor';

class Database {
  private static instance: Database;
  private dbAccessor: DBAccessor;

  private constructor() {
    this.dbAccessor = new DBAccessor();
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async initialize(): Promise<void> {
    await this.dbAccessor.connect();
    await this.dbAccessor.initializeSchema();
  }

  public getAccessor(): DBAccessor {
    return this.dbAccessor;
  }

  public async close(): Promise<void> {
    await this.dbAccessor.close();
  }
}

export default Database;
