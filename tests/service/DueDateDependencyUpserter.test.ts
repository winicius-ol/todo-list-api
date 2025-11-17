import { describe, test, expect } from "@jest/globals";
import DueDateDependencyUpserter from "@/service/DueDateDependencyUpserter";
import DueDateDependencyUpserterDTO from "@/dto/DueDateDependencyUpserterDTO";

describe('#execute', () => {
  test('should create a due date dependency', () => {
    const params: DueDateDependencyUpserterDTO = {
      parentId: 1,
      childId: 2,
      delay: 1
    }

    const dueDateDependencyUpserter = new DueDateDependencyUpserter(params)
    const dueDateDependency = dueDateDependencyUpserter.execute()

    expect(dueDateDependency.getParentId()).toBe(params.parentId)
    expect(dueDateDependency.getChildId()).toBe(params.childId)
    expect(dueDateDependency.getDelay()).toBe(params.delay)
  })
})
