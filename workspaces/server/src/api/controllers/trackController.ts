import type { Request, Response } from "express";
import type { Track } from "@br/core";
import type { ErrorRequest } from "../../types";

import tracksServices from "../services/tracksServices";
import cache from "../../cache";

const getAllReleases = async (req: Request, res: Response): Promise<void> => {
  const queryParams = req.query;

  try {
    const tracks = await tracksServices.getAllReleases(req.userId, queryParams);
    await cache.set<Track[]>(req.originalUrl, tracks);

    res.send({ status: "OK", data: tracks });
  } catch (error) {
    const err = error as ErrorRequest;

    res
      .status(err?.status || 500)
      .send({ status: "FAILED", data: { error: err?.message || error } });
  }
};

const getAllUpcomings = async (req: Request, res: Response): Promise<void> => {
  const queryParams = req.query;

  try {
    const tracks = await tracksServices.getAllUpcomings(req.userId, queryParams);
    await cache.set<Track[]>(req.originalUrl, tracks);

    res.send({ status: "OK", data: tracks });
  } catch (error) {
    const err = error as ErrorRequest;

    res
      .status(err?.status || 500)
      .send({ status: "FAILED", data: { error: err?.message || error } });
  }
};

const getArtistsReleases = async (req: Request, res: Response): Promise<void> => {
  try {
    const tracks = await tracksServices.getArtistsReleases(req.userId);
    await cache.set<Track[]>(req.originalUrl, tracks);

    res.send({ status: "OK", data: tracks });
  } catch (error: unknown | ErrorRequest) {
    const err = error as ErrorRequest;

    res
      .status(err?.status || 500)
      .send({ status: "FAILED", data: { error: err?.message || error } });
  }
};

const getArtistsUpcoming = async (req: Request, res: Response): Promise<void> => {
  try {
    const tracks = await tracksServices.getArtistsUpcoming(req.userId);
    await cache.set<Track[]>(req.originalUrl, tracks);

    res.send({ status: "OK", data: tracks });
  } catch (error: unknown | ErrorRequest) {
    const err = error as ErrorRequest;

    res
      .status(err?.status || 500)
      .send({ status: "FAILED", data: { error: err?.message || error } });
  }
};

const getLabelsReleases = async (req: Request, res: Response): Promise<void> => {
  try {
    const tracks = await tracksServices.getLabelsReleases(req.userId);
    await cache.set<Track[]>(req.originalUrl, tracks);

    res.send({ status: "OK", data: tracks });
  } catch (error: unknown | ErrorRequest) {
    const err = error as ErrorRequest;

    res
      .status(err?.status || 500)
      .send({ status: "FAILED", data: { error: err?.message || error } });
  }
};

const getLabelsUpcoming = async (req: Request, res: Response): Promise<void> => {
  try {
    const tracks = await tracksServices.getLabelsUpcoming(req.userId);
    await cache.set<Track[]>(req.originalUrl, tracks);

    res.send({ status: "OK", data: tracks });
  } catch (error: unknown | ErrorRequest) {
    const err = error as ErrorRequest;

    res
      .status(err?.status || 500)
      .send({ status: "FAILED", data: { error: err?.message || error } });
  }
};

const getTracksByArtistId = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);

  try {
    const tracks = await tracksServices.getTracksByArtistId(req.userId, id);
    res.send({ status: "OK", data: tracks });
  } catch (error: unknown | ErrorRequest) {
    const err = error as ErrorRequest;

    res
      .status(err?.status || 500)
      .send({ status: "FAILED", data: { error: err?.message || error } });
  }
};

const getTracksByLabelId = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);

  try {
    const tracks = await tracksServices.getTracksByLabelId(id, req.userId);
    res.send({ status: "OK", data: tracks });
  } catch (error: unknown | ErrorRequest) {
    const err = error as ErrorRequest;

    res
      .status(err?.status || 500)
      .send({ status: "FAILED", data: { error: err?.message || error } });
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
