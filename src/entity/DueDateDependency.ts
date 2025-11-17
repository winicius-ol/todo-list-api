import BadRequestError from "@/error/BadRequestError";

export default class DueDateDependency {
  private parentId: number
  private childId: number
  private delay: number

  constructor(
    parentId: number,
    childId: number,
    delay: number
  ) {
    this.validateRefIds(parentId, childId)
    this.validateDelay(delay)

    this.parentId = parentId
    this.childId = childId
    this.delay = delay
  }

  getParentId(): number {
    return this.parentId
  }

  getChildId(): number {
    return this.childId
  }

  getDelay(): number {
    return this.delay
  }

  private validateRefIds(parentId: number, childId: number): void {
    if (parentId === childId) {
      throw new BadRequestError("Parent and child cannot be the same")
    }
  }

  private validateDelay(delay: number): void {
    if (delay < 0) {
      throw new BadRequestError("Invalid delay")
    }
  }
}
