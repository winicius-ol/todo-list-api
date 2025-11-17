import { describe, test, expect } from "@jest/globals";
import DueDateDependencyDeleter from "@/service/DueDateDependencyDeleter";
import DueDateDependencyDeleterDTO from "@/dto/DueDateDependencyDeleterDTO";
import DueDateDependency from "@/entity/DueDateDependency";

describe('#execute', () => {
  test('when due date dependency is not found, should return undefined', () => {
    const params: DueDateDependencyDeleterDTO = {
      dueDateDependency: undefined,
      parentId: 1,
      childId: 2
    }

    const dueDateDependencyDeleter = new DueDateDependencyDeleter(params)
    const result = dueDateDependencyDeleter.execute()

    expect(result).toBeUndefined()
  })

  test('when due date dependency is found, should return the dependency to be deleted', () => {
    const dependencyToDelete = new DueDateDependency(1, 2, 5)
    const params: DueDateDependencyDeleterDTO = {
      dueDateDependency: dependencyToDelete,
      parentId: 1,
      childId: 2
    }

    const dueDateDependencyDeleter = new DueDateDependencyDeleter(params)
    const result = dueDateDependencyDeleter.execute()

    expect(result).toBeDefined()
    expect(result?.getParentId()).toBe(1)
    expect(result?.getChildId()).toBe(2)
    expect(result?.getDelay()).toBe(5)
  })
})
