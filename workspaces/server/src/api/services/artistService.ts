import type { Artist, ApiParams } from "@br/core";

import cache from "../../cache";
import { beatportScrap } from "../../utils";

import { artistAdapter } from "../adapters";
import { artistDAL } from "../data-access-layer";

const getAllArtists = async (userId: number, params: ApiParams): Promise<Artist[]> => {
  const artists = await artistDAL.getAllByUserId(userId, params);
  return artists.map((artist) => artistAdapter(artist));
};

const createNewArtist = async (id: number, userId: number): Promise<Artist> => {
  const artistExist = await artistDAL.isConnectedWithUser(id, userId);
  if (artistExist) throw { status: 409, message: "Artists already exist" };

  const artist = await artistDAL.getOneById(id);
  if (artist && artist.artwork && artist.updatedAt === new Date()) {
    await artistDAL.connectWithUser(id, userId);
    return artistAdapter(artist, userId);
  }

  const artistOnCache = await cache.get<Artist>(`/artist/${id}`);
  let newArtist = {} as Artist;

  if (artistOnCache) {
    newArtist = artistOnCache;
  } else {
    const [artist] = await beatportScrap.artists([{ id: id }]);
    newArtist = artist;
  }

  if (newArtist.tracks.length) {
    const newArtistSaved = await artistDAL.saveWithTracks(newArtist, userId);
    return artistAdapter(newArtistSaved);
  }

  const newArtistSaved = await artistDAL.save(newArtist, userId);
  return artistAdapter(newArtistSaved);
};

const getOneArtist = async (id: number, userId: number): Promise<Artist> => {
  const artist = await artistDAL.getOneById(id);
  if (artist && artist.artwork) return artistAdapter(artist, userId);

  const artistOnCache = await cache.get<Artist>(`/artist/${id}`);
  if (artistOnCache) return artistOnCache;

  const [artistScreped] = await beatportScrap.artists([{ id }]);
  cache.set(`/artist/${id}`, artistScreped);
  return artistScreped;
};

const deteleOneArtist = async (id: number, userId: number): Promise<void> => {
  const artistExist = await artistDAL.isConnectedWithUser(id, userId);
  if (!artistExist) throw { status: 404, message: "artists not found" };

  await artistDAL.disconnectWithUser(id, userId);
};

export default {
  getAllArtists,
  createNewArtist,
  getOneArtist,
  deteleOneArtist,
};
