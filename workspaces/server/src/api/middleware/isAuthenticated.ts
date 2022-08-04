import type { Request, Response, NextFunction } from "express";
import type { JwtDecode } from "@br/core";

import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../../config/constants";

export default async function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  try {
    const autorization = req.get("authorization");

    if (autorization && autorization.toLocaleLowerCase().startsWith("bearer")) {
      const token = autorization.split(" ")[1];
      const decode = jwt.verify(token, JWT_SECRET) as JwtDecode;

      if (!token || !decode.id) {
        return res.status(403).send({ status: "FAILD", message: "token missin or invalid" });
      }

      req.userId = decode.id;
      next();
    }
  } catch (error) {
    return res.status(401).send({ status: "FAILD", message: "token missin or invalid" });
  }
}
