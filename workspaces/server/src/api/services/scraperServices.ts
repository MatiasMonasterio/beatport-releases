import type { Label, Artist } from "@br/core";

import { beatportScrap } from "../../utils";
import cache from "../../cache";
import db from "../../database";

// remove when apply auth and users
const USER_ID = 1;
const USER_LABEL_KEY = `LABELS-${USER_ID}`;
const USER_ARTIST_KEY = `ARTISTS-${USER_ID}`;

const scrapLabels = async (): Promise<Label[]> => {
  try {
    const labelsDb = await db.label.findMany({
      where: { users: { some: { userId: USER_ID } } },
    });

    if (!labelsDb.length) return [];

    const labels = await beatportScrap.labels(labelsDb);
    await cache.set<Label[]>(USER_LABEL_KEY, labels);

    return labels;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const scrapArtists = async (): Promise<Artist[]> => {
  try {
    const artistsDb = await db.artist.findMany({
      where: { users: { some: { userId: USER_ID } } },
    });

    if (!artistsDb.length) return [];

    const artists = await beatportScrap.artists(artistsDb);
    await cache.set<Artist[]>(USER_ARTIST_KEY, artists);

    return artists;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  artists: scrapArtists,
  labels: scrapLabels,
};
