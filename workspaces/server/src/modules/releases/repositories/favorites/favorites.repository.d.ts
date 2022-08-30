import type { Track } from "@br/core";
import type { UserId, ArtistId } from "../../../../core/domain";
import type { FavoriteRepo } from "../../interfaces";

export interface FavoritesRepository {
  getAllWithUserId: (userId: UserId) => Promise<FavoriteRepo[]>;
  save: (track: Track, userId: UserId) => Promise<FavoriteRepo | null>;
  delete: (id: ArtistId) => Promise<void>;
  isConnectedWithUser: (id: ArtistId, userId: UserId) => Promise<boolean>;
}
