import type { NextFunction, Request, Response } from "express";

import { sendHttpResponse } from "../../utils";
import { trackService } from "../services";

const getAllReleases = async (req: Request, res: Response, next: NextFunction) => {
  const queryParams = req.query;

  try {
    const tracks = await trackService.getAllReleases(req.userId, queryParams);
    sendHttpResponse({ data: tracks, res });
  } catch (error) {
    next(error);
  }
};

const getAllUpcomings = async (req: Request, res: Response, next: NextFunction) => {
  const queryParams = req.query;

  try {
    const tracks = await trackService.getAllUpcomings(req.userId, queryParams);
    sendHttpResponse({ data: tracks, res });
  } catch (error) {
    next(error);
  }
};

const getArtistsReleases = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tracks = await trackService.getArtistsReleases(req.userId);
    sendHttpResponse({ data: tracks, res });
  } catch (error) {
    next(error);
  }
};

const getArtistsUpcoming = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId;

  try {
    const tracks = await trackService.getArtistsUpcoming(userId);
    sendHttpResponse({ data: tracks, res });
  } catch (error) {
    next(error);
  }
};

const getLabelsReleases = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tracks = await trackService.getLabelsReleases(req.userId);
    sendHttpResponse({ data: tracks, res });
  } catch (error) {
    next(error);
  }
};

const getLabelsUpcoming = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tracks = await trackService.getLabelsUpcoming(req.userId);
    sendHttpResponse({ data: tracks, res });
  } catch (error) {
    next(error);
  }
};

const getTracksByArtistId = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);

  try {
    const tracks = await trackService.getTracksByArtistId(req.userId, id);
    sendHttpResponse({ data: tracks, res });
  } catch (error) {
    next(error);
  }
};

const getTracksByLabelId = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);

  try {
    const tracks = await trackService.getTracksByLabelId(id, req.userId);
    sendHttpResponse({ data: tracks, res });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllReleases,
  getAllUpcomings,
  getArtistsReleases,
  getArtistsUpcoming,
  getLabelsReleases,
  getLabelsUpcoming,
  getTracksByArtistId,
  getTracksByLabelId,
};
