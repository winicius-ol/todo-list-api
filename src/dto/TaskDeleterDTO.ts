import Task from "@/entity/Task";

export default interface TaskDeleterDTO {
  taskId: number;
  task?: Task | undefined;
}
