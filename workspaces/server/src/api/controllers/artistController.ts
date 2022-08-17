import type { NextFunction, Request, Response } from "express";

import { sendHttpResponse } from "../../utils";
import { artistService } from "../services";

const getAllArtists = async (req: Request, res: Response, next: NextFunction) => {
  const queryParams = req.query;

  try {
    const artists = await artistService.getAllArtists(req.userId, queryParams);
    sendHttpResponse({ data: artists, res });
  } catch (error) {
    next(error);
  }
};

const createNewArtist = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.body.id);

  try {
    const artist = await artistService.createNewArtist(id, req.userId);
    sendHttpResponse({ status: 201, data: artist, res });
  } catch (error) {
    next(error);
  }
};

const getOneArtist = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);

  try {
    const artist = await artistService.getOneArtist(id, req.userId);
    sendHttpResponse({ data: artist, res });
  } catch (error) {
    next(error);
  }
};

const deteleOneArtist = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);

  try {
    await artistService.deteleOneArtist(id, req.userId);
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
