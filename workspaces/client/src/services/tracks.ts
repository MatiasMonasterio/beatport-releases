import type { Track } from "@br/core";

import { getArtistReleases, getArtistUpcomings } from "./artists";
import { getLabelReleases, getLabelUpcomings } from "./labels";

export const getReleases = async (): Promise<Track[]> => {
  try {
    const artistReleases = await getArtistReleases();
    const labelReleases = await getLabelReleases();

    const releases = [...artistReleases, ...labelReleases];

    return releases
      .filter((release, index, self) => {
        return self.findIndex((releaseSelf) => releaseSelf.id === release.id) === index;
      })
      .sort((a, b) => b.released - a.released);
  } catch (error) {
    return [];
  }
};

export const getUpcomings = async (): Promise<Track[]> => {
  try {
    const artistUpcomings = await getArtistUpcomings();
    const labelUpcomings = await getLabelUpcomings();

    const upcomings = [...artistUpcomings, ...labelUpcomings];
    labelUpcomings;
    return upcomings
      .filter((upcoming, index, self) => {
        return self.findIndex((upcomingSelf) => upcomingSelf.id === upcoming.id) === index;
      })
      .sort((a, b) => b.released - a.released);
  } catch (error) {
    return [];
  }
};
