import DueDateDependency from "@/entity/DueDateDependency";

export default interface DueDateDependencyDeleterDTO {
  parentId: number;
  childId: number;
  dueDateDependency?: DueDateDependency | undefined;
}
