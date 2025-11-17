import { describe, test, expect } from "@jest/globals";
import TaskDeleter from "@/service/TaskDeleter";
import TaskDeleterDTO from "@/dto/TaskDeleterDTO";
import Task, { TaskStatus } from "@/entity/Task";

describe('#execute', () => {
  test('when task is not found, should return undefined', () => {
    const params: TaskDeleterDTO = {
      task: undefined,
      taskId: 1
    }

    const taskDeleter = new TaskDeleter(params)
    const result = taskDeleter.execute()

    expect(result).toBeUndefined()
  })

  test('when task is found, should return the task to be deleted', () => {
    const taskToDelete = new Task("Task to delete", "Description", TaskStatus.Pending, "2025-11-17", 1)
    const params: TaskDeleterDTO = {
      task: taskToDelete,
      taskId: 1
    }

    const taskDeleter = new TaskDeleter(params)
    const result = taskDeleter.execute()

    expect(result).toBeDefined()
  })
})
