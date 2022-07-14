import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../../config/constants";

interface Decode {
  id: string;
}

export default async function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  try {
    const autorization = req.get("authorization");

    if (autorization && autorization.toLocaleLowerCase().startsWith("bearer")) {
      const token = autorization.split(" ")[1];
      const decode = jwt.verify(token, JWT_SECRET) as Decode;

      if (!token || !decode.id) {
        return res.status(401).send({ status: "FAILD", message: "token missin or invalid" });
      }

      req.userId = decode.id;
      next();
    }
  } catch (error) {
    return res.status(401).send({ status: "FAILD", message: "token missin or invalid" });
  }
}
