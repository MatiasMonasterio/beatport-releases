import type { Request, Response } from "express";
import type { Favorite } from "@br/core";
import type { ErrorRequest } from "../../types";

import favoriteServices from "../services/favoriteServices";
import cache from "../../cache";
import { clearFavoriteCache } from "../../utils/clearCache";

const getAllFavorites = async (req: Request, res: Response): Promise<void> => {
  try {
    const favorites = await favoriteServices.getAllFavorites(+req.userId);
    await cache.set<Favorite[]>(req.originalUrl, favorites);

    res.send({ status: "OK", data: favorites });
  } catch (error: unknown | ErrorRequest) {
    const err = error as ErrorRequest;

    res
      .status(err?.status || 500)
      .send({ status: "FAILED", data: { error: err?.message || error } });
  }
};

const createNewFavorite = async (req: Request, res: Response): Promise<void> => {
  const track = req.body;

  try {
    const favorite = await favoriteServices.createNewFavorite(+req.userId, track);
    await clearFavoriteCache();
    res.send({ status: "OK", data: favorite });
  } catch (error: unknown | ErrorRequest) {
    const err = error as ErrorRequest;

    res
      .status(err?.status || 500)
      .send({ status: "FAILED", data: { error: err?.message || error } });
  }
};

const deleteOneFavorite = async (req: Request, res: Response): Promise<void> => {
  try {
    await favoriteServices.deleteOneFavorite(+req.params.id, +req.userId);
    await clearFavoriteCache();
    res.status(200).send();
  } catch (error: unknown | ErrorRequest) {
    const err = error as ErrorRequest;

    res
      .status(err?.status || 500)
      .send({ status: "FAILED", data: { error: err?.message || error } });
  }
};

export default {
  getAllFavorites,
  createNewFavorite,
  deleteOneFavorite,
};
