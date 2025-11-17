import DueDateDependencyUpserterDTO from "@/dto/DueDateDependencyUpserterDTO";
import DueDateDependency from "@/entity/DueDateDependency";

export default class DueDateDependencyUpserter {
  constructor(
    private params: DueDateDependencyUpserterDTO
  ) {}

  execute(): DueDateDependency {
    return new DueDateDependency(
      this.params.parentId,
      this.params.childId,
      this.params.delay
    )
  }
}
