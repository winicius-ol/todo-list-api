import { describe, expect, test } from "@jest/globals";
import DueDateDependency from "@/entity/DueDateDependency";
import BadRequestError from "@/error/BadRequestError";

describe('#constructor', () => {
  test('should create a due date dependency with the provided properties', () => {
    const params = {
      parentId: 1,
      childId: 2,
      delay: 1
    }

    const dueDateDependency = new DueDateDependency(params.parentId, params.childId, params.delay)

    expect(dueDateDependency.getParentId()).toEqual(params.parentId)
    expect(dueDateDependency.getChildId()).toEqual(params.childId)
    expect(dueDateDependency.getDelay()).toEqual(params.delay)
  })

  test('should not create a due date dependency with invalid delay', () => {
    const params = {
      parentId: 1,
      childId: 2,
      delay: -1
    }

    expect(() => new DueDateDependency(params.parentId, params.childId, params.delay))
      .toThrow(new BadRequestError("Invalid delay"))
  })
})
