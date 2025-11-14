import Database from '@/db/Database';
import GetTasksOrchestrator from "@/orchestrator/GetTasksOrchestrator";
import BadRequestError from "@/error/BadRequestError";
import { Request, Response } from "express";

export default class GetTasksController{
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  async execute(req: Request, res: Response) {
    try {
      await this.db.initialize();
      const dbAccessor = this.db.getAccessor();

      const orchestrator = new GetTasksOrchestrator(dbAccessor);
      const tasks = await orchestrator.execute();

      res.status(200).json({ tasks });
    } catch (error) {
      if (error instanceof BadRequestError) {
        console.error('Validation error:', error.message);
        res.status(error.statusCode).json({ error: error.message });
      } else {
        console.error('Runtime error:', error instanceof Error ? error.message : String(error));
        res.status(500).json({ error: 'Internal server error' });
      }
    } finally {
      await this.db.close();
    }
  }
}
