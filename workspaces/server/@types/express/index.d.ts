// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Express } from "express";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}
