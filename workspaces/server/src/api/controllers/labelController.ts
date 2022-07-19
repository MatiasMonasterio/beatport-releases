import type { Request, Response } from "express";
import type { Label } from "@br/core";
import type { ErrorRequest } from "../../types";

import { clearLabelCache } from "../../utils/clearCache";
import labelService from "../services/labelServices";
import cache from "../../cache";

const getAllLabels = async (req: Request, res: Response): Promise<void> => {
  const queryParams = req.query;
  try {
    const labels = await labelService.getAllLabels(+req.userId, queryParams);
    await cache.set<Label[]>(req.originalUrl, labels);

    res.send({ status: "OK", data: labels });
  } catch (error: unknown | ErrorRequest) {
    const err = error as ErrorRequest;

    res
      .status(err?.status || 500)
      .send({ status: "FAILED", data: { error: err?.message || error } });
  }
};

const createNewLabel = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.body;

  if (!id) {
    res.status(400).send({ status: "FAILED", data: { error: "id is missing or invalid" } });
    return;
  }

  try {
    const labels = await labelService.createNewLabel(+id, +req.userId);
    res.status(201).send({ status: "OK", data: labels });

    await clearLabelCache();
  } catch (error: unknown | ErrorRequest) {
    const err = error as ErrorRequest;

    res
      .status(err?.status || 500)
      .send({ status: "FAILED", data: { error: err?.message || error } });
  }
};

const getOneLabel = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    res.status(400).send({ status: "FAILED", data: { error: "id is missing or invalid" } });
  }

  try {
    const label = await labelService.getOneLabel(+id, +req.userId);

    if (!label) {
      res.status(404).send({ status: "FAILED", data: { error: "label not found" } });
    } else {
      await cache.set<Label>(req.originalUrl, label);
      res.send({ status: "OK", data: label });
    }
  } catch (error: unknown | ErrorRequest) {
    const err = error as ErrorRequest;

    res
      .status(err?.status || 500)
      .send({ status: "FAILED", data: { error: err?.message || error } });
  }
};

const deteleOneLabel = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!id) res.status(404).send({ status: "FAILED", data: { error: "id is missing or invalid" } });

  try {
    await labelService.deteleOneLabel(+id, +req.userId);
    res.status(200).send();

    await clearLabelCache();
  } catch (error: unknown | ErrorRequest) {
    const err = error as ErrorRequest;

    res
      .status(err?.status || 500)
      .send({ status: "FAILED", data: { error: err?.message || error } });
  }
};

export default {
  getAllLabels,
  createNewLabel,
  getOneLabel,
  deteleOneLabel,
};
