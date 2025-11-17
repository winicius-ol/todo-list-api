import Task, { TaskStatus } from "@/entity/Task";
import { DBAccessor } from "../db/DBAccessor";


export default class TaskRepository {
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

  static async findById(id: number, dbAccessor: DBAccessor): Promise<Task | undefined> {
    const result = await dbAccessor.executeQuery('SELECT * FROM tasks WHERE id = ?', [id]);

    if (!result.rows?.[0]) return undefined
    const foundTaskRow = result.rows[0]

    return new Task(foundTaskRow.title, foundTaskRow.description, foundTaskRow.status, foundTaskRow.due_date, foundTaskRow.id)
  }

  static async update(task: Task, dbAccessor: DBAccessor): Promise<void> {
    await dbAccessor.executeQuery(
      'UPDATE tasks SET title = ?, description = ?, status = ?, due_date = ? WHERE id = ?',
      [task.getTitle(), task.getDescription(), task.getStatus(), task.getDueDate(), task.getId()]
    );
  }
}
