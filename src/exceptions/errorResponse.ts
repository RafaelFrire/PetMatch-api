import { Response } from "express";

export class ErrorResponse extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message); 
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }

  public sendResponse(res: Response) {
    return res
      .status(this.statusCode)
      .json({ errorMessage: this.message, status: this.statusCode });
  }
}