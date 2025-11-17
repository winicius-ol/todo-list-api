import DueDateDependencyDeleterDTO from "@/dto/DueDateDependencyDeleterDTO";
import DueDateDependency from "@/entity/DueDateDependency";

export default class DueDateDependencyDeleter {
  constructor(private params: DueDateDependencyDeleterDTO) {}

  execute(): DueDateDependency | undefined {
    const { dueDateDependency } = this.params
    if (!dueDateDependency) return

    return dueDateDependency
  }
}
