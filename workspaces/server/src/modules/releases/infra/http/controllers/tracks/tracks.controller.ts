import type { NextFunction, Request, Response } from "express";
import type { ApiParams } from "@br/core";
import type { UserId, TrackId } from "../../../../../../core/domain";
import type { TracksController } from "./tracks.controller.d";

import { sendHttpResponse } from "../../../../../../infra/http/utilities";
import { tracksService } from "../../../../services";

const tracksController: TracksController = {
  getAllReleases: async (req: Request, res: Response, next: NextFunction) => {
    const queryParams: ApiParams = req.query;
    const userId: UserId = req.decode.id;

    try {
      const tracks = await tracksService.getAllReleases(userId, queryParams);
      sendHttpResponse({ data: tracks, res });
    } catch (error) {
      next(error);
    }
  },

  getAllUpcomings: async (req: Request, res: Response, next: NextFunction) => {
    const queryParams: ApiParams = req.query;
    const userId: UserId = req.decode.id;

    try {
      const tracks = await tracksService.getAllUpcomings(userId, queryParams);
      sendHttpResponse({ data: tracks, res });
    } catch (error) {
      next(error);
    }
  },

  getArtistsReleases: async (req: Request, res: Response, next: NextFunction) => {
    const userId: UserId = req.decode.id;

    try {
      const tracks = await tracksService.getArtistsReleases(userId);
      sendHttpResponse({ data: tracks, res });
    } catch (error) {
      next(error);
    }
  },

  getArtistsUpcoming: async (req: Request, res: Response, next: NextFunction) => {
    const userId: UserId = req.decode.id;

    try {
      const tracks = await tracksService.getArtistsUpcoming(userId);
      sendHttpResponse({ data: tracks, res });
    } catch (error) {
      next(error);
    }
  },

  getLabelsReleases: async (req: Request, res: Response, next: NextFunction) => {
    const userId: UserId = req.decode.id;

    try {
      const tracks = await tracksService.getLabelsReleases(userId);
      sendHttpResponse({ data: tracks, res });
    } catch (error) {
      next(error);
    }
  },

  getLabelsUpcoming: async (req: Request, res: Response, next: NextFunction) => {
    const userId: UserId = req.decode.id;

    try {
      const tracks = await tracksService.getLabelsUpcoming(userId);
      sendHttpResponse({ data: tracks, res });
    } catch (error) {
      next(error);
    }
  },

  getTracksByArtistId: async (req: Request, res: Response, next: NextFunction) => {
    const trackId: TrackId = parseInt(req.params.id);
    const userId: UserId = req.decode.id;

    try {
      const tracks = await tracksService.getTracksByArtistId(userId, trackId);
      sendHttpResponse({ data: tracks, res });
    } catch (error) {
      next(error);
    }
  },

  getTracksByLabelId: async (req: Request, res: Response, next: NextFunction) => {
    const trackId: TrackId = parseInt(req.params.id);
    const userId: UserId = req.decode.id;

    try {
      const tracks = await tracksService.getTracksByLabelId(trackId, userId);
      sendHttpResponse({ data: tracks, res });
    } catch (error) {
      next(error);
    }
  },
};

export default tracksController;
