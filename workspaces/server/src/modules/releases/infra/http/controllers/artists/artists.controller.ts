import type { NextFunction, Request, Response } from "express";
import type { ApiParams } from "@br/core";
import type { ArtistId, UserId } from "../../../../../../core/domain";
import type { ArtistsController } from "./artists.controller.d";

import { sendHttpResponse } from "../../../../../../infra/http/utilities";
import { artistsService } from "../../../../services";

const artistsController: ArtistsController = {
  getAllArtists: async (req: Request, res: Response, next: NextFunction) => {
    const queryParams: ApiParams = req.query;
    const userId: UserId = req.decode.id;

    try {
      const artists = await artistsService.getAllByUserId(userId, queryParams);
      sendHttpResponse({ data: artists, res });
    } catch (error) {
      next(error);
    }
  },

  createNewArtist: async (req: Request, res: Response, next: NextFunction) => {
    const artistId: ArtistId = req.body.id;
    const userId: UserId = req.decode.id;

    try {
      const artist = await artistsService.createAndConnectWithUser(artistId, userId);
      sendHttpResponse({ status: 201, data: artist, res });
    } catch (error) {
      next(error);
    }
  },

  getOneArtist: async (req: Request, res: Response, next: NextFunction) => {
    const artistId: ArtistId = parseInt(req.params.id);
    const userId: UserId = req.decode.id;

    try {
      const artist = await artistsService.getOneById(artistId, userId);
      sendHttpResponse({ data: artist, res });
    } catch (error) {
      next(error);
    }
  },

  deteleOneArtist: async (req: Request, res: Response, next: NextFunction) => {
    const artistId: ArtistId = parseInt(req.params.id);
    const userId: UserId = req.decode.id;

    try {
      await artistsService.deleteOneById(artistId, userId);
      sendHttpResponse({ data: {}, res });
    } catch (error) {
      next(error);
    }
  },
};

export default artistsController;
