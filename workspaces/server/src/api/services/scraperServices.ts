import type { Label, Artist } from "@br/core";

import { beatportScrap } from "../../utils";
import db from "../../database";

const scrapLabels = async (userId: number): Promise<Label[]> => {
  const labelsInDb = await db.labelDB.findMany({
    where: { users: { some: { id: userId } } },
  });

  if (!labelsInDb.length) return [];

  return await beatportScrap.labels(labelsInDb);
};

const scrapArtists = async (userId: number): Promise<Artist[]> => {
  const artistOnDb = await db.artistDB.findMany({
    where: { users: { some: { id: userId } } },
  });

  if (!artistOnDb.length) return [];

  return await beatportScrap.artists(artistOnDb);
};

export default {
  artists: scrapArtists,
  labels: scrapLabels,
};
