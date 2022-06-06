import { Label, Track } from "@br/core";

import { beatportScrap } from "../../utils";
import scraperService from "./scraperServices";
import cache from "../../cache";
import db from "../../database";

// remove when apply auth and users
const USER_ID = 1;
const USER_LABEL_KEY = `LABELS-${USER_ID}`;

const getAllLabels = async (): Promise<Label[]> => {
  const reply = await cache.get(USER_LABEL_KEY);
  return reply ? JSON.parse(reply) : await scraperService.labels();
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

  const reply = await cache.get(USER_LABEL_KEY);

  if (!reply) {
    await cache.set(USER_LABEL_KEY, JSON.stringify([newLabel]));
  } else {
    const labels: Label[] = JSON.parse(reply);
    labels.push(newLabel);

    const labelSorted = labels.sort((a, b) => a.name.localeCompare(b.name));
    await cache.set(USER_LABEL_KEY, JSON.stringify(labelSorted));
  }

  await cache.del(`/api/labels/${id}`);
  return newLabel;
};

const getLabelsReleases = async (): Promise<Track[]> => {
  const reply = await cache.get(USER_LABEL_KEY);
  const labels: Label[] = reply ? JSON.parse(reply) : await scraperService.labels();

  if (!labels.length) return [];

  return labels
    .map((label) => [...label.tracks])
    .reduce((previous, current) => [...previous, ...current])
    .filter((track) => track.released < new Date().getTime())
    .sort((a, b) => b.released - a.released);
};

const getLabelsUpcoming = async (): Promise<Track[]> => {
  const reply = await cache.get(USER_LABEL_KEY);
  const labels: Label[] = reply ? JSON.parse(reply) : await scraperService.labels();

  if (!labels.length) return [];

  return labels
    .map((label) => [...label.tracks])
    .reduce((previous, current) => [...previous, ...current])
    .filter((track) => track.released >= new Date().getTime())
    .sort((a, b) => b.released - a.released);
};

const getOneLabel = async (id: number): Promise<Label> => {
  const reply = await cache.get(USER_LABEL_KEY);
  const labels: Label[] = reply ? JSON.parse(reply) : await scraperService.labels();

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

  const reply = await cache.get(USER_LABEL_KEY);

  if (!reply) {
    const labels = await scraperService.labels();
    labels.length && (await cache.set(USER_LABEL_KEY, JSON.stringify(labels)));
  } else {
    const labels: Label[] = JSON.parse(reply);
    const labelToRemove = labels.findIndex((label) => label.id === id);

    if (labelToRemove >= 0 && labels.length) {
      labels.splice(labelToRemove, 1);
      const labelsSorted = labels.sort((a, b) => a.name.localeCompare(b.name));
      await cache.set(USER_LABEL_KEY, JSON.stringify(labelsSorted));
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
