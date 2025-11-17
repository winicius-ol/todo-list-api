import { TaskStatus } from "@/entity/Task";

export default interface TaskPropertiesDTO {
  title?: string;
  description?: string;
  status?: TaskStatus;
  dueDate?: string;
}
