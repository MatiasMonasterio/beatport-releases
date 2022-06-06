import { Label, Track } from "@br/core";

import { beatportScrap } from "../../utils";
import scraperService from "./scraperServices";
import cache from "../../cache";
import db from "../../database";

// remove when apply auth and users
const USER_ID = 1;
const USER_LABEL_KEY = `LABELS-${USER_ID}`;

const getAllLabels = async (): Promise<Label[]> => {
  const labelsCached = await cache.get<Label[]>(USER_LABEL_KEY);
  return labelsCached ? labelsCached : await scraperService.labels();
};

const createNewLabel = async (id: number): Promise<Label> => {
  const label = await db.label.findFirst({
    where: { id: id, users: { some: { userId: USER_ID } } },
    select: { users: true },
  });

  if (label) throw { status: 409, message: "Artists already exist" };

  const [newLabel] = await beatportScrap.labels([id]);

  const labelExist = await db.label.findUnique({ where: { id: id } });
  if (!labelExist) await db.label.create({ data: { id: newLabel.id } });
  await db.labelsOnUser.create({ data: { userId: USER_ID, labelId: id } });

  const labelsCached = await cache.get<Label[]>(USER_LABEL_KEY);

  if (!labelsCached) {
    await cache.set<Label[]>(USER_LABEL_KEY, [newLabel]);
  } else {
    labelsCached.push(newLabel);

    const labelSorted = labelsCached.sort((a, b) => a.name.localeCompare(b.name));
    await cache.set<Label[]>(USER_LABEL_KEY, labelSorted);
  }

  await cache.del(`/api/labels/${id}`);
  return newLabel;
};

const getLabelsReleases = async (): Promise<Track[]> => {
  const labelsCached = await cache.get<Label[]>(USER_LABEL_KEY);
  const labels = labelsCached ? labelsCached : await scraperService.labels();

  if (!labels.length) return [];

  return labels
    .map((label) => [...label.tracks])
    .reduce((previous, current) => [...previous, ...current])
    .filter((track) => track.released < new Date().getTime())
    .sort((a, b) => b.released - a.released);
};

const getLabelsUpcoming = async (): Promise<Track[]> => {
  const labelsCached = await cache.get<Label[]>(USER_LABEL_KEY);
  const labels = labelsCached ? labelsCached : await scraperService.labels();

  if (!labels.length) return [];

  return labels
    .map((label) => [...label.tracks])
    .reduce((previous, current) => [...previous, ...current])
    .filter((track) => track.released >= new Date().getTime())
    .sort((a, b) => b.released - a.released);
};

const getOneLabel = async (id: number): Promise<Label> => {
  const labelsCached = await cache.get<Label[]>(USER_LABEL_KEY);
  const labels = labelsCached ? labelsCached : await scraperService.labels();

  const label = labels.find((label) => label.id === id);
  if (label) {
    label.follow = true;
    return label;
  }

  const [newLabel] = await beatportScrap.labels([+id]);
  return newLabel;
};

const deteleOneLabel = async (id: number): Promise<void> => {
  const label = await db.labelsOnUser.findUnique({
    where: { userId_labelId: { userId: USER_ID, labelId: id } },
  });

  if (!label) throw { status: 404, message: "label not found" };

  await db.labelsOnUser.delete({
    where: { userId_labelId: { labelId: id, userId: USER_ID } },
  });

  const labelUsed = await db.labelsOnUser.findMany({
    where: { labelId: id },
  });

  if (!labelUsed.length) await db.label.delete({ where: { id: id } });

  const labelsCached = await cache.get<Label[]>(USER_LABEL_KEY);

  if (!labelsCached) {
    const labels = await scraperService.labels();
    labels.length && (await cache.set<Label[]>(USER_LABEL_KEY, labels));
  } else {
    const labelToRemove = labelsCached.findIndex((label) => label.id === id);

    if (labelToRemove >= 0 && labelsCached.length) {
      labelsCached.splice(labelToRemove, 1);
      const labelsSorted = labelsCached.sort((a, b) => a.name.localeCompare(b.name));
      await cache.set<Label[]>(USER_LABEL_KEY, labelsSorted);
    }
  }

  await cache.del(`/api/labels/${id}`);
};

export default {
  getAllLabels,
  createNewLabel,
  getLabelsReleases,
  getLabelsUpcoming,
  getOneLabel,
  deteleOneLabel,
};
