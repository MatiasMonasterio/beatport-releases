import type { RequestHandler } from "express";

export interface UsersController {
  getUser: RequestHandler;
}
