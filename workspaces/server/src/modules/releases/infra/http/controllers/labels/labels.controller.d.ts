import type { RequestHandler } from "express";

export interface LabelsController {
  getAllLabels: RequestHandler;
  createNewLabel: RequestHandler;
  getOneLabel: RequestHandler;
  deteleOneLabel: RequestHandler;
}
