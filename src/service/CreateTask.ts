import CreateTaskDTO from "@/dto/CreateTaskDTO";
import Task from "@/entity/Task";

class CreateTask {
  constructor(private params: CreateTaskDTO) {}

  execute() {
    return new Task(this.params.title, this.params.description, this.params.status)
  }
}

export default CreateTask
