import type { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import { HttpException } from "../../models";

export default function checkValidation(req: Request, _res: Response, next: NextFunction) {
  try {
    const validation = validationResult(req);

    if (!validation.isEmpty()) {
      const errorMessage = `${validation.array()[0].param} ${validation.array()[0].msg}`;
      throw new HttpException(400, errorMessage);
    }

    next();
  } catch (error) {
    next(error);
  }
}
