import Database from '@/db/Database';
import TaskEditorDTO from "@/dto/TaskEditorDTO";
import EditTaskOrchestrator from "@/orchestrator/EditTaskOrchestrator";
import BadRequestError from "@/error/BadRequestError";
import { Request, Response } from "express";

export default class EditTaskController{
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  async execute(req: Request, res: Response) {
    const taskParams: TaskEditorDTO = {
      taskId: Number(req.params.taskId),
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      dueDate: req.body.due_date
    }

    try {
      await this.db.initialize();
      const dbAccessor = this.db.getAccessor();

      const orchestrator = new EditTaskOrchestrator(taskParams, dbAccessor);
      const taskId = await orchestrator.execute();

      res.status(200).json({ taskId });
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
