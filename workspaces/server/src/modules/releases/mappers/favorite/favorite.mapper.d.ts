import type { FavoriteDTO } from "../../dto";
import type { FavoriteRepo } from "../../interfaces";

export interface FavoriteMapper {
  persistenceToDTO: (favorite: FavoriteRepo) => FavoriteDTO;
}
