import type { NextFunction, Request, Response } from "express";

import { sendHttpResponse } from "../../utils";
import { favoriteService } from "../services";

const getAllFavorites = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId;

  try {
    const favorites = await favoriteService.getAllFavorites(userId);
    sendHttpResponse({ data: favorites, res });
  } catch (error) {
    next(error);
  }
};

const createNewFavorite = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId;
  const track = req.body;

  try {
    const favorite = await favoriteService.createNewFavorite(userId, track);
    sendHttpResponse({ data: favorite, res });
  } catch (error) {
    next(error);
  }
};

const deleteOneFavorite = async (req: Request, res: Response, next: NextFunction) => {
  const favoriteId = parseInt(req.params.id);
  const userId = req.userId;

  try {
    await favoriteService.deleteOneFavorite(favoriteId, userId);
    sendHttpResponse({ res });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllFavorites,
  createNewFavorite,
  deleteOneFavorite,
};
