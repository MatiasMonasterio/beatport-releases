import type { NextFunction, Request, Response } from "express";
import type { ApiParams } from "@br/core";
import type { LabelId, UserId } from "../../../../../../core/domain";
import type { LabelsController } from "./labels.controller.d";

import { sendHttpResponse } from "../../../../../../infra/http/utilities";
import { labelsService } from "../../../../services";

const labelsController: LabelsController = {
  getAllLabels: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const queryParams: ApiParams = req.query;
    const userId: UserId = req.decode.id;

    try {
      const labels = await labelsService.getAllLabels(userId, queryParams);
      sendHttpResponse({ data: labels, res });
    } catch (error) {
      next(error);
    }
  },

  createNewLabel: async (req: Request, res: Response, next: NextFunction) => {
    const labelId: LabelId = req.body.id;
    const userId: UserId = req.decode.id;

    try {
      const labels = await labelsService.createAndConnectWithUser(labelId, userId);
      sendHttpResponse({ status: 201, data: labels, res });
    } catch (error) {
      next(error);
    }
  },

  getOneLabel: async (req: Request, res: Response, next: NextFunction) => {
    const labelId: LabelId = parseInt(req.params.id);
    const userId: UserId = req.decode.id;

    try {
      const label = await labelsService.getOneLabel(labelId, userId);
      sendHttpResponse({ data: label, res });
    } catch (error) {
      next(error);
    }
  },

  deteleOneLabel: async (req: Request, res: Response, next: NextFunction) => {
    const labelId: LabelId = parseInt(req.params.id);
    const userId: UserId = req.decode.id;

    try {
      await labelsService.deteleOneLabel(labelId, userId);
      sendHttpResponse({ res });
    } catch (error) {
      next(error);
    }
  },
};

export default labelsController;
