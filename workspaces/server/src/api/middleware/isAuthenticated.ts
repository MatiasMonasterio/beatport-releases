import type { Request, Response, NextFunction } from "express";

import { HttpException } from "../../models";
import jwt from "../../utils/jwt";

export default async function isAuthenticated(req: Request, _res: Response, next: NextFunction) {
  try {
    const autorization = req.get("authorization");

    if (autorization && autorization.toLocaleLowerCase().startsWith("bearer")) {
      const token = autorization.split(" ")[1];
      const decode = jwt.verify(token);

      if (!token || !decode.id) {
        throw new Error("Invalid or missin token");
      }

      req.userId = decode.id;
      return next();
    }

    throw new Error("Invalid or missin token");
  } catch (error) {
    const err = error as Error;
    const errorExpection = new HttpException(403, err.message);

    next(errorExpection);
  }
}
