import type { Label, ApiParams } from "@br/core";

import cache from "../../cache";
import { HttpException } from "../../models";
import { beatportScrap } from "../../utils";

import { labelAdapter } from "../adapters";
import { labelDAL } from "../data-access-layer";

const getAllLabels = async (userId: number, params: ApiParams): Promise<Label[]> => {
  const labels = await labelDAL.getAllByUserId(userId, params);
  return labels.map((label) => labelAdapter(label));
};

const createNewLabel = async (id: number, userId: number): Promise<Label> => {
  const labelExist = await labelDAL.isConnectedWithUser(id, userId);
  if (labelExist) throw new HttpException(409, "Label already exist");

  const label = await labelDAL.getOneById(id);
  if (label && label.artwork) {
    await labelDAL.connectWithUser(id, userId);
    return labelAdapter(label);
  }

  const labelOnCache = await cache.get<Label>(`/label/${id}`);
  let newLabel = null;

  if (labelOnCache) {
    newLabel = labelOnCache;
  } else {
    const [label] = await beatportScrap.labels([{ id: id }]);
    newLabel = label;
  }

  if (newLabel.tracks.length) {
    const newLabelSaved = await labelDAL.saveWithTracks(newLabel, userId);
    return labelAdapter(newLabelSaved);
  }

  const newLabelSaved = await labelDAL.save(newLabel, userId);
  return labelAdapter(newLabelSaved);
};

const getOneLabel = async (id: number, userId: number): Promise<Label> => {
  const label = await labelDAL.getOneById(id);
  if (label && label.artwork) return labelAdapter(label, userId);

  const labelOnCache = await cache.get<Label>(`/label/${id}`);
  if (labelOnCache) return labelOnCache;

  const [newLabel] = await beatportScrap.labels([{ id }]);
  cache.set(`/label/${id}`, newLabel);
  return newLabel;
};

const deteleOneLabel = async (id: number, userId: number): Promise<void> => {
  const labelExist = await labelDAL.isConnectedWithUser(id, userId);
  if (!labelExist) throw new HttpException(404, "Label not found");

  await labelDAL.connectWithUser(id, userId);
};

export default {
  getAllLabels,
  createNewLabel,
  getOneLabel,
  deteleOneLabel,
};
