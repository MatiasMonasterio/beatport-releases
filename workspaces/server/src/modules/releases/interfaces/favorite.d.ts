import { FavoriteDB } from "@prisma/client";
import { TrackRepo } from "./track";

export interface FavoriteRepo extends FavoriteDB {
  track: TrackRepo;
}
