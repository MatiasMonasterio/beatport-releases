import type { ApiParams } from "@br/core";
import type { UserId, ArtistId, LabelId } from "../../../../core/domain";
import type { TrackDTO } from "../../dto";

export interface TracksService {
  getAllReleases: (userId: UserId, params: ApiParams) => Promise<TrackDTO[]>;
  getAllUpcomings: (userId: UserId, params: ApiParams) => Promise<TrackDTO[]>;
  getArtistsReleases: (userId: UserId) => Promise<TrackDTO[]>;
  getArtistsUpcoming: (userId: UserId) => Promise<TrackDTO[]>;
  getLabelsReleases: (userId: UserId) => Promise<TrackDTO[]>;
  getLabelsUpcoming: (userId: UserId) => Promise<TrackDTO[]>;
  getTracksByArtistId: (userId: UserId, artistId: ArtistId) => Promise<TrackDTO[]>;
  getTracksByLabelId: (labelId: LabelId, userId: UserId) => Promise<TrackDTO[]>;
}
