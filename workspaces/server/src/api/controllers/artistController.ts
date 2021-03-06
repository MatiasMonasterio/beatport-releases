import type { Request, Response } from "express";
import type { Artist } from "@br/core";
import type { ErrorRequest } from "../../types";

import cache from "../../cache";
import { clearArtistCache } from "../../utils/clearCache";
import artistService from "../services/artistService";

const getAllArtists = async (req: Request, res: Response): Promise<void> => {
  const queryParams = req.query;

  try {
    const artists = await artistService.getAllArtists(+req.userId, queryParams);

    await cache.set<Artist[]>(req.originalUrl, artists);
    res.send({ status: "OK", data: artists });
  } catch (error: unknown | ErrorRequest) {
    const err = error as ErrorRequest;

    res
      .status(err?.status || 500)
      .send({ status: "FAILED", data: { error: err?.message || error } });
  }
};

const createNewArtist = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.body;

  if (!id) {
    res.status(400).send({ status: "FAILED", data: { error: "id is missing or invalid" } });
    return;
  }

  try {
    const artist = await artistService.createNewArtist(+id, +req.userId);
    res.status(201).send({ status: "OK", data: artist });

    await clearArtistCache();
  } catch (error: unknown | ErrorRequest) {
    const err = error as ErrorRequest;

    res
      .status(err?.status || 500)
      .send({ status: "FAILED", data: { error: err?.message || error } });
  }
};

const getOneArtist = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    res.status(400).send({ status: "FAILED", data: { error: "id is missing or invalid" } });
  }

  try {
    const artist = await artistService.getOneArtist(id, +req.userId);

    if (!artist) {
      res.status(404).send({ status: "FAILED", data: { error: "artist not found" } });
    } else {
      await cache.set<Artist>(req.originalUrl, artist);
      res.send({ status: "OK", data: artist });
    }
  } catch (error: unknown | ErrorRequest) {
    const err = error as ErrorRequest;

    res
      .status(err?.status || 500)
      .send({ status: "FAILED", data: { error: err?.message || error } });
  }
};

const deteleOneArtist = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!id) res.status(404).send({ status: "FAILED", data: { error: "id is missing or invalid" } });

  try {
    await artistService.deteleOneArtist(+id, +req.userId);
    res.status(200).send();

    await clearArtistCache();
  } catch (error: unknown | ErrorRequest) {
    const err = error as ErrorRequest;

    res
      .status(err?.status || 500)
      .send({ status: "FAILED", data: { error: err?.message || error } });
  }
};

export default {
  getAllArtists,
  createNewArtist,
  getOneArtist,
  deteleOneArtist,
};
