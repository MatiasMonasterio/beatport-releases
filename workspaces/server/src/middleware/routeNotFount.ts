import type { Request, Response, NextFunction } from "express";
import { HttpException } from "../models";

export default function (req: Request, _res: Response, next: NextFunction) {
  next(new HttpException(404, `Can't find ${req.originalUrl} on this server!`));
}
