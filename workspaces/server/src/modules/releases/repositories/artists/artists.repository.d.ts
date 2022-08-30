import type { ApiParams } from "@br/core";
import type { UserId, ArtistId } from "../../../../core/domain";
import type { ScraperArtistDTO } from "../../../scraper";
import type { ArtistRepo } from "../../interfaces";

interface Repository<T> {
  exist(id: number): Promise<boolean>;
  deleteOne(id: number): Promise<void>;
  getOneById(id: number): Promise<T | null>;
}

export interface ArtistRepository extends Repository<ArtistRepo> {
  getAllByUserId(userId: ArtistId, params: ApiParams): Promise<ArtistRepo[]>;
  saveAndConnectWithUser(artist: ScraperArtistDTO, userID: UserId): Promise<ArtistRepo>;
  connectWithUser(artistId: ArtistId, userId: UserId): Promise<void>;
  disconnectWithUser(artistId: ArtistId, userId: UserId): Promise<void>;
  isConnectedWithUser(artistId: ArtistId, userId: UserId): Promise<boolean>;
}
