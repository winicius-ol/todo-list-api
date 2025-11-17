import { DBAccessor } from "@/db/DBAccessor";
import TaskRepository from "@/repository/TaskRepository";

export default class GetTasksOrchestrator {
  constructor(private dbAccessor: DBAccessor) {}

  async execute() {
    return await TaskRepository.getAll(this.dbAccessor);
  }
}
