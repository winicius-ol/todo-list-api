import Task, { TaskStatus } from "@/entity/Task";

export default interface TaskEditorDTO {
  taskId: number;
  task?: Task | undefined;
  title?: string;
  description?: string;
  status?: TaskStatus;
  dueDate?: string;
}
