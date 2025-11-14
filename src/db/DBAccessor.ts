import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';

export interface QueryResult {
  rows?: any[];
  lastID?: number;
  changes?: number;
}

export class DBAccessor {
  private db: sqlite3.Database | null = null;
  private dbPath: string;

  constructor(dbPath: string = './data/database.db') {
    this.dbPath = dbPath;
  }

  async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Ensure directory exists
      const dir = path.dirname(this.dbPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      this.db = new sqlite3.Database(this.dbPath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async executeQuery(sql: string, params: any[] = []): Promise<QueryResult> {
    if (!this.db) {
      throw new Error('Database not connected. Call connect() first.');
    }

    return new Promise((resolve, reject) => {
      if (sql.trim().toLowerCase().startsWith('select')) {
        this.db!.all(sql, params, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve({ rows });
          }
        });
      } else {
        this.db!.run(sql, params, function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({ 
              lastID: this.lastID, 
              changes: this.changes 
            });
          }
        });
      }
    });
  }

  async executeScript(scriptPath: string): Promise<void> {
    if (!this.db) {
      throw new Error('Database not connected. Call connect() first.');
    }

    const script = fs.readFileSync(scriptPath, 'utf8');
    const statements = script.split(';').filter(stmt => stmt.trim().length > 0);

    for (const statement of statements) {
      await this.executeQuery(statement.trim());
    }
  }

  async close(): Promise<void> {
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      this.db!.close((err) => {
        if (err) {
          reject(err);
        } else {
          this.db = null;
          resolve();
        }
      });
    });
  }

  async initializeSchema(): Promise<void> {
    const schemaPath = path.join(__dirname, 'schema', 'main.sql');
    if (fs.existsSync(schemaPath)) {
      await this.executeScript(schemaPath);
    }
  }
}
