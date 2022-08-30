export default class HttpException extends Error {
  public readonly code: number;
  public readonly message: string;

  constructor(status: number, message: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.code = status;
    this.message = message;

    Error.captureStackTrace(this);
  }
}
