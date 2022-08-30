import type { ApiParams } from "@br/core";
import type { UserId, ArtistId } from "../../../../core/domain";

export interface ArtistService<T> {
  getAllByUserId(userId: UserId, params: ApiParams): Promise<T[]>;
  getOneById(artistId: ArtistId, userId: UserId): Promise<T>;
  createAndConnectWithUser(artistId: ArtistId, userId: UserId): Promise<T>;
  deleteOneById(artistId: ArtistId, userId: UserId): Promise<void>;
}
