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

    expect(task.getTitle()).toBe(params.title)
    expect(task.getDescription()).toBe(params.description)
    expect(task.getStatus()).toBe(TaskStatus.Pending)
  })
})
