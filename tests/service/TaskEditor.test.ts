import { describe, test, expect } from "@jest/globals";
import Task from "@/entity/Task";
import TaskEditor from "@/service/TaskEditor";
import TaskEditorDTO from "@/dto/TaskEditorDTO";
import { TaskStatus } from "@/entity/Task";

describe('#execute', () => {
  test('when task is not found, should do nothing', () => {
    const params: TaskEditorDTO = {
      task: undefined,
      title: "New title",
      description: "New description",
      status: TaskStatus.Completed,
      dueDate: "2026-11-17",
      taskId: 1
    }

    const taskEditor = new TaskEditor(params)
    const result = taskEditor.execute()

    expect(result).toBeUndefined()
  })
  test('when task is found, should update it', () => {
    const params: TaskEditorDTO = {
      task: new Task("Original task", "Original description", TaskStatus.Pending, "2025-11-17", 1),
      title: "New title",
      description: "New description",
      status: TaskStatus.Completed,
      dueDate: "2026-11-17",
      taskId: 2
    }

    const taskEditor = new TaskEditor(params)
    const result = taskEditor.execute()

    expect(result?.getTitle()).toBe(params.title)
    expect(result?.getDescription()).toBe(params.description)
    expect(result?.getStatus()).toBe(params.status)
    expect(result?.getDueDate()).toBe(params.dueDate)
    expect(result?.getId()).toBe(1)
  })
})
