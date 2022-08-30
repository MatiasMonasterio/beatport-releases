import { RequestHandler } from "express";

export interface AuthController {
  login: RequestHandler;
  register: RequestHandler;
  logout: RequestHandler;
}
