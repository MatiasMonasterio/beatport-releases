import { Artist, Label, Track } from "@br/core";

import scraperService from "./scraperServices";
import cache from "../../cache";

// remove when apply auth and users
const USER_ID = 1;
const USER_ARTIST_KEY = `ARTISTS-${USER_ID}`;
const USER_LABEL_KEY = `LABELS-${USER_ID}`;

const getAllReleases = async (): Promise<Track[]> => {
  const artistsReleases = await getArtistsReleases();
  const labelReleases = await getLabelsReleases();

  const releases = [...artistsReleases, ...labelReleases]
    .filter((release, index, self) => {
      return self.findIndex((releaseSelf) => releaseSelf.id === release.id) === index;
    })
    .sort((a, b) => b.released - a.released);

  return releases;
};

const getAllUpcomings = async (): Promise<Track[]> => {
  const artistsUpcomings = await getArtistsUpcoming();
  const labelsUpcomings = await getLabelsUpcoming();

  const upcomings = [...artistsUpcomings, ...labelsUpcomings]
    .filter((upcoming, index, self) => {
      return self.findIndex((upcomingSelf) => upcomingSelf.id === upcoming.id) === index;
    })
    .sort((a, b) => b.released - a.released);

  return upcomings;
};

const getArtistsReleases = async (): Promise<Track[]> => {
  const artistsCached = await cache.get<Artist[]>(USER_ARTIST_KEY);
  const artists = artistsCached ? artistsCached : await scraperService.artists();

  if (!artists.length) return [];

  return artists
    .map((artist) => [...artist.tracks])
    .reduce((previous, current) => [...previous, ...current])
    .filter((track) => track.released < new Date().getTime())
    .sort((a, b) => b.released - a.released);
};

const getArtistsUpcoming = async (): Promise<Track[]> => {
  const artistsCached = await cache.get<Artist[]>(USER_ARTIST_KEY);
  const artists = artistsCached ? artistsCached : await scraperService.artists();

  if (!artists.length) return [];
  return artists
    .map((artist) => [...artist.tracks])
    .reduce((previous, current) => [...previous, ...current])
    .filter((track) => track.released >= new Date().getTime())
    .sort((a, b) => b.released - a.released);
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

export default {
  getAllReleases,
  getAllUpcomings,
  getArtistsReleases,
  getArtistsUpcoming,
  getLabelsReleases,
  getLabelsUpcoming,
};
