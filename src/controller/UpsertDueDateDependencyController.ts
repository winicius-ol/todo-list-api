import Database from '@/db/Database';
import BadRequestError from "@/error/BadRequestError";
import { Request, Response } from "express";
import DueDateDependencyUpserterDTO from '@/dto/DueDateDependencyUpserterDTO';
import UpsertDueDateDependencyOrchestrator from '@/orchestrator/UpsertDueDateDependencyOrchestrator';

export default class UpsertDueDateDependencyController{
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  async execute(req: Request, res: Response) {
    const dueDateDependencyParams: DueDateDependencyUpserterDTO = {
      parentId: req.body.parentId,
      childId: req.body.childId,
      delay: req.body.delay
    }

    try {
      await this.db.initialize();
      const dbAccessor = this.db.getAccessor();

      const orchestrator = new UpsertDueDateDependencyOrchestrator(dueDateDependencyParams, dbAccessor);
      const dueDateDependency = await orchestrator.execute();

      res.status(201).json({ dueDateDependency });
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
