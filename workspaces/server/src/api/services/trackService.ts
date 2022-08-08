import type { Track, ApiParams } from "@br/core";

import { trackAdapter } from "../adapters";
import { artistService, labelService } from "../services";
import { trackDAL, artistDAL, labelDAL } from "../data-access-layer";

const getAllReleases = async (userId: number, params: ApiParams): Promise<Track[]> => {
  const releases = await trackDAL.getReleasesByUserId(userId, params);
  return releases.map((release) => trackAdapter(release, userId));
};

const getAllUpcomings = async (userId: number, params: ApiParams): Promise<Track[]> => {
  const upcomings = await trackDAL.getUpcomingsByUserId(userId, params);
  return upcomings.map((upcoming) => trackAdapter(upcoming, userId));
};

const getArtistsReleases = async (userId: number): Promise<Track[]> => {
  const artistReleases = await trackDAL.getArtistsReleasesByUserId(userId);
  return artistReleases.map((release) => trackAdapter(release, userId));
};

const getArtistsUpcoming = async (userId: number): Promise<Track[]> => {
  const artistUpcomgins = await trackDAL.getArtistsUpcomingsByUserId(userId);
  return artistUpcomgins.map((upcoming) => trackAdapter(upcoming, userId));
};

const getLabelsReleases = async (userId: number): Promise<Track[]> => {
  const labelReleases = await trackDAL.getLabelsReleasesByUserId(userId);
  return labelReleases.map((release) => trackAdapter(release, userId));
};

const getLabelsUpcoming = async (userId: number): Promise<Track[]> => {
  const labelUpcomgins = await trackDAL.getLabelsUpcomingsByUserId(userId);
  return labelUpcomgins.map((upcoming) => trackAdapter(upcoming, userId));
};

const getTracksByArtistId = async (userId: number, artistId: number): Promise<Track[]> => {
  const artistExist = await artistDAL.isConnectedWithUser(artistId, userId);

  if (artistExist) {
    const tracks = await trackDAL.getAllTracksByArtistId(artistId);
    return tracks.map((track) => trackAdapter(track, userId));
  }

  const artist = await artistService.getOneArtist(artistId, userId);
  return artist.tracks;
};

const getTracksByLabelId = async (labelId: number, userId: number): Promise<Track[]> => {
  const labelExist = await labelDAL.isConnectedWithUser(labelId, userId);

  if (labelExist) {
    const tracks = await trackDAL.getAllTracksByLabelId(labelId);
    return tracks.map((track) => trackAdapter(track, userId));
  }

  const label = await labelService.getOneLabel(labelId, userId);
  return label.tracks;
};

export default {
  getAllReleases,
  getAllUpcomings,
  getArtistsReleases,
  getArtistsUpcoming,
  getLabelsReleases,
  getLabelsUpcoming,
  getTracksByArtistId,
  getTracksByLabelId,
};
