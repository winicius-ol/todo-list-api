import { DBAccessor } from "@/db/DBAccessor";
import { TaskRepository } from "@/repository/TaskRepository";

export default class GetTasksOrchestrator {
  constructor(private dbAccessor: DBAccessor) {}

  async execute() {
    return TaskRepository.getAll(this.dbAccessor);
  }
}
