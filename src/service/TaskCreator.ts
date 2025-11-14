import TaskCreatorDTO from "@/dto/TaskCreatorDTO";
import Task from "@/entity/Task";

export default class TaskCreator {
  constructor(private params: TaskCreatorDTO) {}

  execute() {
    return new Task(this.params.title, this.params.description, this.params.status)
  }
}
