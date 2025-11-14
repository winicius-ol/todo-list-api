import { TaskStatus } from "@/entity/Task";

export default interface CreateTaskDTO {
  title: string;
  description: string;
  status?: TaskStatus;
}
