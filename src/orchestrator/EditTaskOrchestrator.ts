import TaskEditor from "@/service/TaskEditor";
import TaskEditorDTO from "@/dto/TaskEditorDTO";
import { DBAccessor } from "@/db/DBAccessor";
import TaskRepository from "@/repository/TaskRepository";

export default class EditTaskOrchestrator {
  constructor(private taskParams: TaskEditorDTO, private dbAccessor: DBAccessor) {}

  async execute() {
    const task = await TaskRepository.findById(this.taskParams.taskId, this.dbAccessor)
    this.taskParams.task = task
    const taskEditor = new TaskEditor(this.taskParams)
    const updatedTask = taskEditor.execute()

    if (!updatedTask) return

    await TaskRepository.update(updatedTask, this.dbAccessor)

    return updatedTask.getId()
  }
}
