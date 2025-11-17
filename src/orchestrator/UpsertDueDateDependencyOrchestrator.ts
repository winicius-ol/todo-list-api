import DueDateDependencyUpserter from "@/service/DueDateDependencyUpserter";
import DueDateDependencyUpserterDTO from "@/dto/DueDateDependencyUpserterDTO";
import DueDateDependencyRepository from "@/repository/DueDateDependencyRepository";
import { DBAccessor } from "@/db/DBAccessor";

export default class UpsertDueDateDependencyOrchestrator {
  constructor(private dueDateDependencyParams: DueDateDependencyUpserterDTO, private dbAccessor: DBAccessor) {}

  async execute() {
    const dueDateDependency = new DueDateDependencyUpserter(this.dueDateDependencyParams).execute()
    await DueDateDependencyRepository.upsert(dueDateDependency, this.dbAccessor)

    return dueDateDependency
  }
}
