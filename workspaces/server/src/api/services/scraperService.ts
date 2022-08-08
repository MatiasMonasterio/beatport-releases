import type { Label, Artist } from "@br/core";

import { beatportScrap } from "../../utils";
import { labelDAL, artistDAL } from "../data-access-layer";

const getAllLabels = async (userId: number): Promise<Label[]> => {
  const labels = await labelDAL.getAllByUserId(userId, {});
  return await beatportScrap.labels(labels);
};

const getAllArtists = async (userId: number): Promise<Artist[]> => {
  const artists = await artistDAL.getAllByUserId(userId, {});
  return await beatportScrap.artists(artists);
};

export default {
  artists: getAllArtists,
  labels: getAllLabels,
};
