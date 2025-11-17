import TaskDeleter from "@/service/TaskDeleter";
import TaskDeleterDTO from "@/dto/TaskDeleterDTO";
import { DBAccessor } from "@/db/DBAccessor";
import TaskRepository from "@/repository/TaskRepository";

export default class DeleteTaskOrchestrator {
  constructor(private taskParams: TaskDeleterDTO, private dbAccessor: DBAccessor) {}

  async execute() {
    const task = await TaskRepository.findById(this.taskParams.taskId, this.dbAccessor)
    this.taskParams.task = task
    const taskDeleter = new TaskDeleter(this.taskParams)
    const taskToDelete = taskDeleter.execute()

    if (!taskToDelete) return

    await TaskRepository.delete(taskToDelete.getId()!, this.dbAccessor)

    return taskToDelete.getId()
  }
}
