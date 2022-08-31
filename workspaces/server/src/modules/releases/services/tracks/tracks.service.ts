import type { ApiParams } from "@br/core";
import type { UserId, ArtistId, LabelId } from "../../../../core/domain";
import type { TracksService } from "./tracks.service.d";

import { scraperService } from "../../../scraper";

import { TrackDTO } from "../../dto";
import { tracksRepository, artistRepository, labelsRepository } from "../../repositories";
import { tempService } from "../../services";
import { trackMapper } from "../../mappers";

const tracksService: TracksService = {
  getAllReleases: async (userId: UserId, params: ApiParams): Promise<TrackDTO[]> => {
    const releases = await tracksRepository.getAllReleasesByUserId(userId, params);
    return releases.map((release) => trackMapper.persistanceToDTO(release, userId));
  },

  getAllUpcomings: async (userId: UserId, params: ApiParams): Promise<TrackDTO[]> => {
    const upcomings = await tracksRepository.getUpcomingsByUserId(userId, params);
    return upcomings.map((upcoming) => trackMapper.persistanceToDTO(upcoming, userId));
  },

  getArtistsReleases: async (userId: UserId): Promise<TrackDTO[]> => {
    const artistReleases = await tracksRepository.getArtistsReleasesByUserId(userId, {});
    return artistReleases.map((release) => trackMapper.persistanceToDTO(release, userId));
  },

  getArtistsUpcoming: async (userId: UserId): Promise<TrackDTO[]> => {
    const artistUpcomgins = await tracksRepository.getArtistsUpcomingsByUserId(userId, {});
    return artistUpcomgins.map((upcoming) => trackMapper.persistanceToDTO(upcoming, userId));
  },

  getLabelsReleases: async (userId: UserId): Promise<TrackDTO[]> => {
    const labelReleases = await tracksRepository.getLabelsReleasesByUserId(userId);
    return labelReleases.map((release) => trackMapper.persistanceToDTO(release, userId));
  },

  getLabelsUpcoming: async (userId: UserId): Promise<TrackDTO[]> => {
    const labelUpcomgins = await tracksRepository.getLabelsUpcomingsByUserId(userId);
    return labelUpcomgins.map((upcoming) => trackMapper.persistanceToDTO(upcoming, userId));
  },

  getTracksByArtistId: async (userId: UserId, artistId: ArtistId): Promise<TrackDTO[]> => {
    const artistExist = await artistRepository.isConnectedWithUser(artistId, userId);
    if (artistExist) {
      const tracks = await tracksRepository.getAllTracksByArtistId(artistId);
      return tracks.map((track) => trackMapper.persistanceToDTO(track, userId));
    }

    const artistOnCache = await tempService.getArtist(artistId);
    if (artistOnCache) {
      return artistOnCache.tracks.map((track) => trackMapper.scraperToDTO(track));
    }

    const artist = await scraperService.getOneArtistById(artistId);
    return artist.tracks.map((track) => trackMapper.scraperToDTO(track));
  },

  getTracksByLabelId: async (labelId: LabelId, userId: UserId): Promise<TrackDTO[]> => {
    const labelExist = await labelsRepository.isConnectedWithUser(labelId, userId);
    if (labelExist) {
      const tracks = await tracksRepository.getAllTracksByLabelId(labelId);
      return tracks.map((track) => trackMapper.persistanceToDTO(track, userId));
    }

    const labelOnCache = await tempService.getLabel(labelId);
    if (labelOnCache) {
      return labelOnCache.tracks.map((track) => trackMapper.scraperToDTO(track));
    }

    const label = await scraperService.getOneLabelById(labelId);
    return label.tracks.map((track) => trackMapper.scraperToDTO(track));
  },
};

export default tracksService;
