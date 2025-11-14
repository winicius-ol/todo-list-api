import Task, { TaskStatus } from "@/entity/Task";
import { DBAccessor } from "../db/DBAccessor";


export class TaskRepository {
  static async create(task: Task, dbAccessor: DBAccessor): Promise<number | undefined> {
    const insertResult = await dbAccessor.executeQuery(
      'INSERT INTO tasks (title, description, status, due_date) VALUES (?, ?, ?, ?)',
      [task.getTitle(), task.getDescription(), task.getStatus(), task.getDueDate()]
    );

    return insertResult.lastID
  }

  static async getAll(dbAccessor: DBAccessor): Promise<Task[] | undefined> {
    const result = await dbAccessor.executeQuery('SELECT * FROM tasks');    
    return (result.rows || []).map((row) => new Task(row.title, row.description, row.status, row.due_date, row.id));
  }
}
