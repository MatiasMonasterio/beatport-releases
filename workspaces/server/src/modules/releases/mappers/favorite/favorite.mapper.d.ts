import type { TrackDTO } from "../../dto";
import type { FavoriteRepo } from "../../interfaces";

export interface FavoriteMapper {
  persistenceToDTO: (favorite: FavoriteRepo) => TrackDTO;
}
