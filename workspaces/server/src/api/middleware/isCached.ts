import type { Request, Response, NextFunction } from "express";
import type { Artist, Label, Track } from "@br/core";

import cache from "../../cache";

export const isCached = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reply = await cache.get<Artist | Artist[] | Label | Label[] | Track[]>(req.originalUrl);
    if (reply) return res.send({ status: "OK", data: reply });

    next();
  } catch (error) {
    console.error(error);
    next();
  }
};
