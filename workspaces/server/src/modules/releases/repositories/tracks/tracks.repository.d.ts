import type { ApiParams } from "@br/core";
import type { UserId, ArtistId, LabelId } from "../../../../core/domain";
import type { TrackRepo } from "../../interfaces";

export interface TracksRepository {
  getAllReleasesByUserId: (userId: UserId, params: ApiParams) => Promise<TrackRepo[]>;
  getUpcomingsByUserId: (userId: UserId, params: ApiParams) => Promise<TrackRepo[]>;
  getArtistsReleasesByUserId: (userId: UserId, params: ApiParams) => Promise<TrackRepo[]>;
  getArtistsUpcomingsByUserId: (userId: UserId, params: ApiParams) => Promise<TrackRepo[]>;
  getLabelsReleasesByUserId: (userId: UserId) => Promise<TrackRepo[]>;
  getLabelsUpcomingsByUserId: (userId: UserId) => Promise<TrackRepo[]>;
  getAllTracksByArtistId: (artistId: ArtistId) => Promise<TrackRepo[]>;
  getAllTracksByLabelId: (labelId: LabelId) => Promise<TrackRepo[]>;
}
