import { describe, expect, test } from "@jest/globals";
import Task, { TaskStatus } from "@/entity/Task";
import BadRequestError from "@/error/BadRequestError";

describe('#constructor', () => {
  test('Creates a task with the provided properties and default status', () => {
    const params = {
      title: 'Test',
      description: 'Test description'
    }

    const task = new Task(params.title, params.description)

    expect(task.getTitle()).toEqual(params.title)
    expect(task.getDescription()).toEqual(params.description)
    expect(task.getStatus()).toEqual(TaskStatus.Pending)
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

    expect(task.getTitle()).toEqual(params.title)
    expect(task.getDescription()).toEqual(params.description)
    expect(task.getStatus()).toEqual(params.status)    
    expect(task.getDueDate()).toEqual(params.dueDate)
  })

  test('Does not create a task with invalid date', () => {
    const params = {
      title: 'Test',
      description: 'Test description',
      status: TaskStatus.Pending,
      dueDate: "Invalid date"
    }

    expect(() => new Task(params.title, params.description, params.status, params.dueDate))
      .toThrow(new BadRequestError("Invalid date format"))
  })

  test('Does not create a task with invalid status', () => {
    const params = {
      title: 'Test',
      description: 'Test description',
      status: "InvalidStatus" as TaskStatus,
      dueDate: "2025-01-30"
    }

    expect(() => new Task(params.title, params.description, params.status, params.dueDate))
    .toThrow(new BadRequestError("Invalid task status"))
  })
})
