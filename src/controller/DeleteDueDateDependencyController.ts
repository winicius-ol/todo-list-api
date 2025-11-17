import Database from '@/db/Database';
import DueDateDependencyDeleterDTO from "@/dto/DueDateDependencyDeleterDTO";
import DeleteDueDateDependencyOrchestrator from "@/orchestrator/DeleteDueDateDependencyOrchestrator";
import BadRequestError from "@/error/BadRequestError";
import { Request, Response } from "express";

export default class DeleteDueDateDependencyController{
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  async execute(req: Request, res: Response) {
    const dueDateDependencyParams: DueDateDependencyDeleterDTO = {
      parentId: Number(req.params.parentId),
      childId: Number(req.params.childId)
    }

    try {
      await this.db.initialize();
      const dbAccessor = this.db.getAccessor();

      const orchestrator = new DeleteDueDateDependencyOrchestrator(dueDateDependencyParams, dbAccessor);
      const result = await orchestrator.execute();

      if (!result) {
        res.status(404).json({ error: 'Due date dependency not found' });
        return;
      }

      res.status(200).json({ message: 'Due date dependency deleted successfully', parentId: result.parentId, childId: result.childId });
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
