import type { NextFunction, Request, Response } from "express";

import { sendHttpResponse } from "../../utils";
import { favoriteService } from "../services";

const getAllFavorites = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const favorites = await favoriteService.getAllFavorites(req.userId);
    sendHttpResponse({ data: favorites, res });
  } catch (error) {
    next(error);
  }
};

const createNewFavorite = async (req: Request, res: Response, next: NextFunction) => {
  const track = req.body;

  try {
    const favorite = await favoriteService.createNewFavorite(req.userId, track);
    sendHttpResponse({ data: favorite, res });
  } catch (error) {
    next(error);
  }
};

const deleteOneFavorite = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);

  try {
    await favoriteService.deleteOneFavorite(id, req.userId);
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
