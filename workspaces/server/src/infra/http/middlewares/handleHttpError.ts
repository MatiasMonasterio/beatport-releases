import type { Request, Response, ErrorRequestHandler, NextFunction } from "express";

import { HttpException } from "../../../core";
import { sendHttpResponse } from "../../../infra/http/utilities";

export default function ErrorRequestHandler(
  error: HttpException,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) {
  console.error(error);
  if (error.code) {
    return sendHttpResponse({ status: error.code, error: error.message, res });
  }

  const err = error as Error;
  return sendHttpResponse({ error: err.message, res });
}
