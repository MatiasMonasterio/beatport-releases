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
    const labelsId = await db.label.findMany({
      where: { users: { some: { userId: USER_ID } } },
      select: { id: true },
    });

    if (!labelsId.length) return [];

    const labelsIdToScrap = labelsId.map((label: { id: number }) => label.id);
    const labels = await beatportScrap.labels(labelsIdToScrap);

    await cache.set(USER_LABEL_KEY, JSON.stringify(labels));

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
      select: { id: true },
    });

    if (!artistsDb.length) return [];

    const artistsIdToScrap = artistsDb.map((artist: { id: number }) => artist.id);
    const artists = await beatportScrap.artists(artistsIdToScrap);

    await cache.set(USER_ARTIST_KEY, JSON.stringify(artists));

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
