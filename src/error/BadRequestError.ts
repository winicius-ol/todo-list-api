export default class BadRequestError extends Error {
  public readonly statusCode: number = 400;

  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BadRequestError);
    }
  }
}
