export enum TaskStatus {
  Pending = "Pending",
  Ongoing = "Ongoing",
  Completed = "Completed"
}

export default class Task {
  constructor(
    private title: string,
    private description: string,
    private status: TaskStatus = TaskStatus.Pending,
    private dueDate?: string
  ) {}

  getTitle() {
    return this.title
  }

  getDescription() {
    return this.description
  }

  getStatus() {
    return this.status
  }

  getDueDate() {
    return this.dueDate;
  }
}
