import type { Request, Response, NextFunction } from "express";
import cache from "../../cache";

export const isCached = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reply = await cache.get(req.originalUrl);
    if (reply) return res.send({ status: "OK", data: JSON.parse(reply) });

    next();
  } catch (error) {
    console.error(error);
    next();
  }
};
