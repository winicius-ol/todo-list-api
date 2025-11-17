import DueDateDependencyDeleter from "@/service/DueDateDependencyDeleter";
import DueDateDependencyDeleterDTO from "@/dto/DueDateDependencyDeleterDTO";
import DueDateDependencyRepository from "@/repository/DueDateDependencyRepository";
import { DBAccessor } from "@/db/DBAccessor";

export default class DeleteDueDateDependencyOrchestrator {
  constructor(private dueDateDependencyParams: DueDateDependencyDeleterDTO, private dbAccessor: DBAccessor) {}

  async execute() {
    const dueDateDependency = await DueDateDependencyRepository.findByIds(
      this.dueDateDependencyParams.parentId, 
      this.dueDateDependencyParams.childId, 
      this.dbAccessor
    )
    this.dueDateDependencyParams.dueDateDependency = dueDateDependency
    const dueDateDependencyDeleter = new DueDateDependencyDeleter(this.dueDateDependencyParams)
    const dependencyToDelete = dueDateDependencyDeleter.execute()

    if (!dependencyToDelete) return

    await DueDateDependencyRepository.delete(
      dependencyToDelete.getParentId(), 
      dependencyToDelete.getChildId(), 
      this.dbAccessor
    )

    return { parentId: dependencyToDelete.getParentId(), childId: dependencyToDelete.getChildId() }
  }
}
