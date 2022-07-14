import type { Request, Response, NextFunction } from "express";
import type { Artist, Label, Track } from "@br/core";

import cache from "../../cache";

export default async function isCached(req: Request, _res: Response, next: NextFunction) {
  try {
    const reply = await cache.get<Artist | Artist[] | Label | Label[] | Track[]>(req.originalUrl);
    // console.log(reply);
    // if (reply) return res.send({ status: "OK", data: reply });
    req.body.reply = reply;

    next();
  } catch (error) {
    console.error(error);
    next();
  }
}
