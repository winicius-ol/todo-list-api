export enum TaskStatus {
  Pending = "Pending",
  Ongoing = "Ongoing",
  Completed = "Completed"
}

interface TaskProps {
  title: string;
  description: string;
  status?: TaskStatus;
}

export default class Task implements TaskProps {
  constructor(
    public title: string,
    public description: string,
    public status: TaskStatus = TaskStatus.Pending
  ) {}
}
