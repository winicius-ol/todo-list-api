import Task, { TaskStatus } from "@/entity/Task";
import { DBAccessor } from "../db/DBAccessor";


export class TaskRepository {
  async create(task: Task, dbAccessor: DBAccessor): Promise<number | undefined> {
    const insertResult = await dbAccessor.executeQuery(
      'INSERT INTO tasks (title, description, status, due_date) VALUES (?, ?, ?, ?)',
      [task.getTitle(), task.getDescription(), task.getStatus(), task.getDueDate()]
    );

    return insertResult.lastID
  }
}
