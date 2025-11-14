import TaskCreator from "@/service/TaskCreator";
import TaskCreatorDTO from "@/dto/TaskCreatorDTO";
import { DBAccessor } from "@/db/DBAccessor";
import { TaskRepository } from "@/repository/TaskRepository";

export default class CreateTaskOrchestrator {
  constructor(private taskParams: TaskCreatorDTO, private dbAccessor: DBAccessor) {}

  async execute() {
    const task = new TaskCreator(this.taskParams).execute()
    const taskId = await new TaskRepository().create(task, this.dbAccessor)

    return taskId
  }
}
