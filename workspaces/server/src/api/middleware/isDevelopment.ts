import type { Request, Response, NextFunction } from "express";
import { NODE_ENV } from "../../config/constants";

export default async function isDeveloment(_req: Request, res: Response, next: NextFunction) {
  try {
    if (NODE_ENV === "development") {
      next();
      return;
    }

    res.send({ status: "FAILED", message: "it is not development environment" });
  } catch (error) {
    console.error(error);
    next();
  }
}
