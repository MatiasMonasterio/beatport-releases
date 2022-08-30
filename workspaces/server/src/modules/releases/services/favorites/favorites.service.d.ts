import type { Track } from "@br/core";
import type { UserId, TrackId } from "../../../../core/domain";
import type { TrackDTO } from "../../dto";

export interface FavoritesServices {
  getAllFavorites: (userId: UserId) => Promise<TrackDTO[]>;
  createNewFavorite: (userId: UserId, track: Track) => Promise<TrackDTO>;
  deleteOneFavorite: (id: TrackId, userId: UserId) => Promise<void>;
}
