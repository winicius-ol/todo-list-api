import DueDateDependency from "@/entity/DueDateDependency";
import { DBAccessor } from "@/db/DBAccessor";

export default class DueDateDependencyRepository {
  static async upsert(dueDateDependency: DueDateDependency, dbAccessor: DBAccessor): Promise<DueDateDependency> {
    await dbAccessor.executeQuery(
      `INSERT INTO due_date_dependencies (parent_id, child_id, delay) 
        VALUES (?, ?, ?) 
        ON CONFLICT(parent_id, child_id) 
        DO UPDATE SET delay = excluded.delay`,
      [dueDateDependency.getParentId(), dueDateDependency.getChildId(), dueDateDependency.getDelay()]
    );

    return dueDateDependency;
  }

  static async getAll(dbAccessor: DBAccessor): Promise<DueDateDependency[] | undefined> {
    const result = await dbAccessor.executeQuery('SELECT * FROM due_date_dependencies');
    return (result.rows || []).map((row) => new DueDateDependency(row.parent_id, row.child_id, row.delay));
  }
}
