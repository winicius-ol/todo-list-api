import Database from '@/db/Database';
import TaskCreatorDTO from "@/dto/TaskCreatorDTO";
import CreateTaskOrchestrator from "@/orchestrator/CreateTaskOrchestrator";
import { Request, Response } from "express";

export default class CreateTaskController{
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  async execute(req: Request, res: Response) {
    const taskParams: TaskCreatorDTO = req.body;

    try {
      await this.db.initialize();
      const dbAccessor = this.db.getAccessor();

      const orchestrator = new CreateTaskOrchestrator(taskParams, dbAccessor);
      const taskId = await orchestrator.execute();

      res.status(201).json({ taskId });
    } catch (error) {
      console.error('Database error:', error);
    } finally {
      await this.db.close();
      console.log('Database connection closed');
    }
  }
}
