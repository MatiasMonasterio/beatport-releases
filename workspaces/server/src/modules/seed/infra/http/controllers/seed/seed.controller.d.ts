import type { RequestHandler } from "express";

export interface SeedController {
  generateData: RequestHandler;
}
