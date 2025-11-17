import BadRequestError from "@/error/BadRequestError";

export default class DueDateDependency {
  private delay: number

  constructor(
    private parentId: number,
    private childId: number,
    delay: number
  ) {
    this.delay = this.handleDelay(delay)
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

  private handleDelay(delay: number): number {
    if (delay < 0) {
      throw new BadRequestError("Invalid delay")
    }

    return delay
  }
}
