import type { Request, Response, NextFunction } from "express";

import { NODE_ENV } from "../../config/constants";
import { HttpException } from "../../models";

export default async function isDeveloment(_req: Request, _res: Response, next: NextFunction) {
  try {
    if (NODE_ENV !== "development") throw Error("It is not development environment");
    next();
  } catch (error) {
    const err = error as Error;
    const errorExpection = new HttpException(403, err.message);

    next(errorExpection);
  }
}
