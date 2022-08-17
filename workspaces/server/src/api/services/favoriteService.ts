import type { Track, Favorite } from "@br/core";

import { HttpException } from "../../models";

import { favoriteAdapter } from "../adapters";
import { favoriteDAL } from "../data-access-layer";

const getAllFavorites = async (userId: number): Promise<Favorite[]> => {
  const favorites = await favoriteDAL.getAllWithUserId(userId);
  return favorites.map((favorite) => favoriteAdapter(favorite, userId));
};

const createNewFavorite = async (userId: number, track: Track): Promise<Favorite> => {
  const favoriteExist = await favoriteDAL.isConnectedWithUser(track.id, userId);
  if (favoriteExist) throw new HttpException(409, "Track already exist");

  const newFavorite = await favoriteDAL.save(track, userId);
  if (!newFavorite) throw new HttpException(500, "Error getting favorite");

  return favoriteAdapter(newFavorite, userId);
};

const deleteOneFavorite = async (id: number, userId: number): Promise<void> => {
  const favoriteExist = await favoriteDAL.isConnectedWithUser(id, userId);
  if (!favoriteExist) throw new HttpException(404, "Favorite not found");

  await favoriteDAL.delete(id);
};

export default {
  getAllFavorites,
  createNewFavorite,
  deleteOneFavorite,
};
