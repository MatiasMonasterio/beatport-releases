import type { Track, Favorite } from "@br/core";

import { favoriteAdapter } from "../adapters";
import { favoriteDAL } from "../data-access-layer";

const getAllFavorites = async (userId: number): Promise<Favorite[]> => {
  const favorites = await favoriteDAL.getAllWithUserId(userId);
  return favorites.map((favorite) => favoriteAdapter(favorite, userId));
};

const createNewFavorite = async (userId: number, track: Track): Promise<Favorite> => {
  const favoriteExist = await favoriteDAL.isConnectedWithUser(track.id, userId);
  if (favoriteExist) throw { status: 409, message: "Track already exist" };

  const newFavorite = await favoriteDAL.save(track, userId);

  if (!newFavorite) throw { code: 500, message: "Error getting favorite" };
  else return favoriteAdapter(newFavorite, userId);
};

const deleteOneFavorite = async (id: number, userId: number): Promise<void> => {
  const favoriteExist = await favoriteDAL.isConnectedWithUser(id, userId);
  if (!favoriteExist) throw { code: 404, message: "favorite not found" };

  await favoriteDAL.delete(id);
};

export default {
  getAllFavorites,
  createNewFavorite,
  deleteOneFavorite,
};
