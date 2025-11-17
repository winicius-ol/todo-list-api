import { DBAccessor } from "@/db/DBAccessor";
import DueDateDependencyRepository from "@/repository/DueDateDependencyRepository";

export default class GetDueDateDependenciesOrchestrator {
  constructor(private dbAccessor: DBAccessor) {}

  async execute() {
    return await DueDateDependencyRepository.getAll(this.dbAccessor);
  }
}
