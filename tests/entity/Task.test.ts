import { describe, expect, test } from "@jest/globals";
import Task, { TaskStatus } from "@/entity/Task";

describe('#constructor', () => {
  test('Creates a task with the provided properties and default status', () => {
    const params = {
      title: 'Test',
      description: 'Test description'
    }

    const task = new Task(params.title, params.description)

    expect(task.getTitle()).toBe(params.title)
    expect(task.getDescription()).toBe(params.description)
    expect(task.getStatus()).toBe(TaskStatus.Pending)
    expect(task.getDueDate()).toBeUndefined()
  })

  test('Creates a task with the provided properties, including status and due date', () => {
    const params = {
      title: 'Test',
      description: 'Test description',
      status: TaskStatus.Ongoing,
      dueDate: "2025-01-30"
    }

    const task = new Task(params.title, params.description, params.status, params.dueDate)

    expect(task.getTitle()).toBe(params.title)
    expect(task.getDescription()).toBe(params.description)
    expect(task.getStatus()).toBe(params.status)
    expect(task.getDueDate()).toBe(new Date(params.dueDate))
  })
})
