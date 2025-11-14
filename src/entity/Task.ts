interface TaskProps {
  title: string;
  description: string;
  status: string;
}

class Task implements TaskProps {
  constructor(
    public title: string,
    public description: string,
    public status: string
  ) {}
}

export default Task
