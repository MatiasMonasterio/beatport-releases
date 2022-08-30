import type { Request, Response, NextFunction } from "express";

import { HttpException } from "../../../../../core";

import { authRepository } from "../../../repositories";
import { blacklistService } from "../../../services";
import { jwt } from "../../../utilities";

export default async function (req: Request, _res: Response, next: NextFunction) {
  try {
    const autorization = req.get("authorization");
    if (!autorization || !autorization.toLocaleLowerCase().startsWith("bearer")) {
      throw new Error("Request without authorization or missin bearer");
    }

    const token = autorization.split(" ")[1];
    const isTokenBlocked = await blacklistService.existToken(token);
    if (isTokenBlocked) throw new Error("Token is blocked");

    const decode = jwt.verify(token);
    if (!token || !decode.id) throw new Error("Invalid token");

    const userExist = await authRepository.getUserById(decode.id);
    if (!userExist || !userExist.active) throw new Error("User is not availabled or not exist");

    req.decode = {
      value: token,
      ...decode,
    };

    return next();
  } catch (error) {
    const err = error as Error;

    console.error(err.message);
    const errorExpection = new HttpException(403, "Missin or invalid token");

    next(errorExpection);
  }
}
