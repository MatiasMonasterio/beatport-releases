import type { Request, Response, ErrorRequestHandler, NextFunction } from "express";
import { HttpException } from "../models";

import { sendHttpResponse } from "../utils";

export default function ErrorRequestHandler(
  error: HttpException,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) {
  if (error.code) {
    return sendHttpResponse({ status: error.code, error: error.message, res });
  }

  const err = error as Error;
  return sendHttpResponse({ error: err.message, res });
}
