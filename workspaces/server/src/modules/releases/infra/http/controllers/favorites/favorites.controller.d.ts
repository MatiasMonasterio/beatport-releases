import type { RequestHandler } from "express";

export interface FavoritesController {
  getAllFavorites: RequestHandler;
  createNewFavorite: RequestHandler;
  deleteOneFavorite: RequestHandler;
}
