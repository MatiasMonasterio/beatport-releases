import type { NextFunction, Request, Response } from "express";

import { sendHttpResponse } from "../../utils";
import { artistService } from "../services";

const getAllArtists = async (req: Request, res: Response, next: NextFunction) => {
  const queryParams = req.query;
  const userId = req.userId;

  try {
    const artists = await artistService.getAllArtists(userId, queryParams);
    sendHttpResponse({ data: artists, res });
  } catch (error) {
    next(error);
  }
};

const createNewArtist = async (req: Request, res: Response, next: NextFunction) => {
  const artistId = req.body.id;
  const userId = req.userId;

  try {
    const artist = await artistService.createNewArtist(artistId, userId);
    sendHttpResponse({ status: 201, data: artist, res });
  } catch (error) {
    next(error);
  }
};

const getOneArtist = async (req: Request, res: Response, next: NextFunction) => {
  const artistId = parseInt(req.params.id);
  const userId = req.userId;

  try {
    const artist = await artistService.getOneArtist(artistId, userId);
    sendHttpResponse({ data: artist, res });
  } catch (error) {
    next(error);
  }
};

const deteleOneArtist = async (req: Request, res: Response, next: NextFunction) => {
  const artistId = parseInt(req.params.id);
  const userId = req.userId;

  try {
    await artistService.deteleOneArtist(artistId, userId);
    sendHttpResponse({ data: {}, res });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllArtists,
  createNewArtist,
  getOneArtist,
  deteleOneArtist,
};
