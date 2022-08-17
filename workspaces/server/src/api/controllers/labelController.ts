import type { NextFunction, Request, Response } from "express";

import { sendHttpResponse } from "../../utils";
import { labelService } from "../services";

const getAllLabels = async (req: Request, res: Response, next: NextFunction) => {
  const queryParams = req.query;

  try {
    const labels = await labelService.getAllLabels(req.userId, queryParams);
    sendHttpResponse({ data: labels, res });
  } catch (error) {
    next(error);
  }
};

const createNewLabel = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.body.id);

  try {
    const labels = await labelService.createNewLabel(id, req.userId);
    sendHttpResponse({ status: 201, data: labels, res });
  } catch (error) {
    next(error);
  }
};

const getOneLabel = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);

  try {
    const label = await labelService.getOneLabel(id, req.userId);
    sendHttpResponse({ data: label, res });
  } catch (error) {
    next(error);
  }
};

const deteleOneLabel = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);

  try {
    await labelService.deteleOneLabel(id, req.userId);
    sendHttpResponse({ res });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllLabels,
  createNewLabel,
  getOneLabel,
  deteleOneLabel,
};
