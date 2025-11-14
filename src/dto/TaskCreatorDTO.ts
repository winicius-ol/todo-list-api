import { TaskStatus } from "@/entity/Task";

export default interface TaskCreatorDTO {
  title: string;
  description: string;
  status?: TaskStatus;
  dueDate?: string;
}
