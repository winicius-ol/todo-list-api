import { describe, expect, test } from "@jest/globals";
import Task from "@/entity/Task";

describe('Task#constructor', () => {
  test('should create a task with the provided properties', () => {
    const params = {
      title: 'Test',
      description: 'Test description',
      status: 'Completed',
    }

    const task = new Task(params.title, params.description, params.status)

    expect(task.title).toBe(params.title)
    expect(task.description).toBe(params.description)
    expect(task.status).toBe(params.status)
  })
})
