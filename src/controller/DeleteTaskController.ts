import Database from '@/db/Database';
import TaskDeleterDTO from "@/dto/TaskDeleterDTO";
import DeleteTaskOrchestrator from "@/orchestrator/DeleteTaskOrchestrator";
import BadRequestError from "@/error/BadRequestError";
import { Request, Response } from "express";

export default class DeleteTaskController{
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  async execute(req: Request, res: Response) {
    const taskParams: TaskDeleterDTO = {
      taskId: Number(req.params.taskId)
    }

    try {
      await this.db.initialize();
      const dbAccessor = this.db.getAccessor();

      const orchestrator = new DeleteTaskOrchestrator(taskParams, dbAccessor);
      const taskId = await orchestrator.execute();

      if (!taskId) {
        res.status(404).json({ error: 'Task not found' });
        return;
      }

      res.status(200).json({ message: 'Task deleted successfully', taskId });
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
