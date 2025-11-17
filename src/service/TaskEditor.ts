import TaskEditorDTO from "@/dto/TaskEditorDTO";
import Task from "@/entity/Task";

export default class TaskEditor {
  constructor(private params: TaskEditorDTO) {}

  execute(): Task | undefined {
    if (!this.params.task) return
  }
}
