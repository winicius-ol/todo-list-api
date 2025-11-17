import TaskDeleterDTO from "@/dto/TaskDeleterDTO";
import Task from "@/entity/Task";

export default class TaskDeleter {
  constructor(private params: TaskDeleterDTO) {}

  execute(): Task | undefined {
    const { task } = this.params
    if (!task) return

    return task
  }
}
