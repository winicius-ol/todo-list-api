import { describe, test, expect } from "@jest/globals";
import CreateTask from "@/service/CreateTask";
import CreateTaskDTO from "@/dto/CreateTaskDTO";
import { TaskStatus } from "@/entity/Task";

describe('#execute', () => {
  test('should create a task', () => {
    const params: CreateTaskDTO = {
      title: 'Test',
      description: 'Test description'
    }

    const createTask = new CreateTask(params)
    const task = createTask.execute()

    expect(task.title).toBe(params.title)
    expect(task.description).toBe(params.description)
    expect(task.status).toBe(TaskStatus.Pending)
  })
})
