import type { Request, Response, NextFunction } from "express";
import jwt from "../../utils/jwt";

export default async function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  try {
    const autorization = req.get("authorization");

    if (autorization && autorization.toLocaleLowerCase().startsWith("bearer")) {
      const token = autorization.split(" ")[1];
      const decode = jwt.verify(token);

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
