import { Label } from "@br/core";

import { beatportScrap } from "../../utils";
import scraperService from "./scraperServices";
import cache from "../../cache";
import db from "../../database";

// remove when apply auth and users
const USER_ID = 1;
const USER_LABEL_KEY = `LABELS-${USER_ID}`;

interface ParamsFilter {
  sort?: keyof Label;
  order?: "desc" | "asc";
  length?: number;
}

const getAllLabels = async ({ sort, order, length }: ParamsFilter): Promise<Label[]> => {
  let labels = await cache.get<Label[]>(USER_LABEL_KEY);
  if (!labels) labels = await scraperService.labels();

  if (sort && labels && labels.length) {
    labels = labels.sort((a, b) => {
      if (typeof a[sort] === "string" && typeof b[sort] === "string") {
        const val1 = a[sort] as string;
        const val2 = b[sort] as string;

        return order === "desc" ? val1.localeCompare(val2) : val2.localeCompare(val1);
      } else {
        const val1 = a[sort] as number;
        const val2 = b[sort] as number;

        return order === "desc" ? val1 - val2 : val2 - val1;
      }
    });
  }

  if (length && labels) labels = labels.slice(0, length);

  return labels;
};

const createNewLabel = async (id: number): Promise<Label> => {
  const label = await db.label.findFirst({
    where: { id: id, users: { some: { userId: USER_ID } } },
  });

  if (label) throw { status: 409, message: "Artists already exist" };

  let labelOnDb = await db.label.findUnique({ where: { id: id } });
  if (!labelOnDb) labelOnDb = await db.label.create({ data: { id: id } });
  await db.labelsOnUser.create({ data: { userId: USER_ID, labelId: id } });

  const [newLabel] = await beatportScrap.labels([labelOnDb]);

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

const getOneLabel = async (id: number): Promise<Label> => {
  const labelsCached = await cache.get<Label[]>(USER_LABEL_KEY);
  const labels = labelsCached ? labelsCached : await scraperService.labels();

  const label = labels.find((label) => label.id === id);

  if (label) {
    label.follow = true;
    return label;
  }

  const [newLabel] = await beatportScrap.labels([{ id }]);
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
  getOneLabel,
  deteleOneLabel,
};
