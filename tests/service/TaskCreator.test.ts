import { describe, test, expect } from "@jest/globals";
import TaskCreator from "@/service/TaskCreator";
import TaskCreatorDTO from "@/dto/TaskCreatorDTO";
import { TaskStatus } from "@/entity/Task";

describe('#execute', () => {
  test('should create a task', () => {
    const params: TaskCreatorDTO = {
      title: 'Test',
      description: 'Test description'
    }

    const taskCreator = new TaskCreator(params)
    const task = taskCreator.execute()

    expect(task.title).toBe(params.title)
    expect(task.description).toBe(params.description)
    expect(task.status).toBe(TaskStatus.Pending)
  })
})
