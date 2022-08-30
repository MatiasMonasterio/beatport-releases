import type { NextFunction, Request, Response } from "express";
import type { UserId, TrackId } from "../../../../../../core/domain";
import type { FavoritesController } from "./favorites.controller.d";

import { sendHttpResponse } from "../../../../../../infra/http/utilities";
import { favoritesService } from "../../../../services";

const favoritesController: FavoritesController = {
  getAllFavorites: async (req: Request, res: Response, next: NextFunction) => {
    const userId: UserId = req.decode.id;

    try {
      const favorites = await favoritesService.getAllFavorites(userId);
      sendHttpResponse({ data: favorites, res });
    } catch (error) {
      next(error);
    }
  },

  createNewFavorite: async (req: Request, res: Response, next: NextFunction) => {
    const userId: UserId = req.decode.id;
    const track = req.body;

    try {
      const favorite = await favoritesService.createNewFavorite(userId, track);
      sendHttpResponse({ data: favorite, res });
    } catch (error) {
      next(error);
    }
  },

  deleteOneFavorite: async (req: Request, res: Response, next: NextFunction) => {
    const favoriteId: TrackId = parseInt(req.params.id);
    const userId: UserId = req.decode.id;

    try {
      await favoritesService.deleteOneFavorite(favoriteId, userId);
      sendHttpResponse({ res });
    } catch (error) {
      next(error);
    }
  },
};

export default favoritesController;
