// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Express } from "express";

declare global {
  namespace Express {
    interface Request {
      decode: {
        value: string;
        id: number;
        username: string;
        avatar: string;
        exp: number;
      };
    }
  }
}
