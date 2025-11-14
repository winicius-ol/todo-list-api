import { describe, expect, test } from "@jest/globals";
import Task, { TaskStatus } from "@/entity/Task";

describe('#constructor', () => {
  test('Creates a task with the provided properties and default status', () => {
    const params = {
      title: 'Test',
      description: 'Test description'
    }

    const task = new Task(params.title, params.description)

    expect(task.title).toBe(params.title)
    expect(task.description).toBe(params.description)
    expect(task.status).toBe(TaskStatus.Pending)
  })

  test('Creates a task with the provided properties, including status', () => {
    const params = {
      title: 'Test',
      description: 'Test description',
      status: TaskStatus.Ongoing
    }

    const task = new Task(params.title, params.description, params.status)

    expect(task.title).toBe(params.title)
    expect(task.description).toBe(params.description)
    expect(task.status).toBe(params.status)
  })
})
