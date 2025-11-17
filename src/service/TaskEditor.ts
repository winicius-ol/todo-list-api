import TaskEditorDTO from "@/dto/TaskEditorDTO";
import Task from "@/entity/Task";
import TaskPropertiesDTO from "@/dto/TaskPropertiesDTO";

export default class TaskEditor {
  constructor(private params: TaskEditorDTO) {}

  execute(): Task | undefined {
    const { task } = this.params
    if (!task) return

    const { title, description, status, dueDate } = this.params
    task.updateProperties({ title, description, status, dueDate } as TaskPropertiesDTO)

    return task
  }
}
