import { TaskStatus } from "@/entity/Task";

interface CreateTaskDTO {
  title: string;
  description: string;
  status?: TaskStatus;
}

export default CreateTaskDTO
