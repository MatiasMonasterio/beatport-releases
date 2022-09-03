import type { Track } from "@br/core";
import type { UserId, TrackId } from "../../../../core/domain";
import type { FavoritesServices } from "./favorites.service.d";

import { HttpException } from "../../../../core";

import { FavoriteDTO } from "../../dto";
import { favoritesRepository } from "../../repositories";
import { favoriteMapper } from "../../mappers";

const favoritesService: FavoritesServices = {
  getAllFavorites: async (userId: UserId): Promise<FavoriteDTO[]> => {
    const favorites = await favoritesRepository.getAllWithUserId(userId);
    return favorites.map((favorite) => favoriteMapper.persistenceToDTO(favorite));
  },

  createNewFavorite: async (userId: UserId, track: Track): Promise<FavoriteDTO> => {
    const favoriteExist = await favoritesRepository.isConnectedWithUser(track.id, userId);
    if (favoriteExist) throw new HttpException(409, "Track already exist");

    const newFavorite = await favoritesRepository.save(track, userId);
    if (!newFavorite) throw new HttpException(500, "Error getting favorite");

    return favoriteMapper.persistenceToDTO(newFavorite);
  },

  deleteOneFavorite: async (trackId: TrackId, userId: UserId): Promise<void> => {
    const favoriteExist = await favoritesRepository.isConnectedWithUser(trackId, userId);
    if (!favoriteExist) throw new HttpException(404, "Favorite not found");

    await favoritesRepository.delete(trackId, userId);
  },
};

export default favoritesService;
