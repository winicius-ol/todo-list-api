export enum TaskStatus {
  Pending = "Pending",
  Ongoing = "Ongoing",
  Completed = "Completed"
}

export default class Task {
  private status: TaskStatus
  private dueDate?: Date | undefined

  constructor(
    private title: string,
    private description: string,
    status: TaskStatus = TaskStatus.Pending,
    dueDate?: string
  ) {
    this.dueDate = this.handleDueDate(dueDate);
    this.status = this.handleStatus(status);
  }

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
    if (!this.dueDate) return;
    return this.dueDate.toISOString().split("T")[0];
  }

  private handleDueDate(dueDate?: string): Date | undefined {
    if (!dueDate) return;
    if (this.isInvalidDate(dueDate)) {
      throw new Error("Invalid date format");
    }

    const [year, month, day] = dueDate.split("-");
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  private isInvalidDate(date?: string): boolean {
    if (!date) return false;

    return !date.match(/^\d{4}-\d{2}-\d{2}$/);
  }

  private handleStatus(status: TaskStatus): TaskStatus {
    const validStatuses = Object.values(TaskStatus);
    if (!validStatuses.includes(status)) {
      throw new Error("Invalid task status");
    }
    return status;
  }
}
