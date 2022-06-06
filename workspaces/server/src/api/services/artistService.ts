import { Artist, Track } from "@br/core";

import { beatportScrap } from "../../utils";
import scraperService from "./scraperServices";
import cache from "../../cache";
import db from "../../database";

// remove when apply auth and users
const USER_ID = 1;
const USER_ARTIST_KEY = `ARTISTS-${USER_ID}`;

const getAllArtists = async (): Promise<Artist[]> => {
  const reply = await cache.get(USER_ARTIST_KEY);
  return reply ? JSON.parse(reply) : await scraperService.artists();
};

const createNewArtist = async (id: number): Promise<Artist> => {
  const artist = await db.artist.findFirst({
    where: { id: id, users: { some: { userId: USER_ID } } },
    select: { users: true },
  });

  if (artist) throw { status: 409, message: "Artists already exist" };

  const [newArtist] = await beatportScrap.artists([id]);

  const artistExits = await db.artist.findUnique({ where: { id: id } });
  if (!artistExits) await db.artist.create({ data: { id: newArtist.id } });
  await db.artistsOnUser.create({ data: { userId: USER_ID, artistId: id } });

  const reply = await cache.get(USER_ARTIST_KEY);

  if (!reply) {
    await cache.set(USER_ARTIST_KEY, JSON.stringify([newArtist]));
  } else {
    const artists: Artist[] = JSON.parse(reply);
    artists.push(newArtist);

    const artistSorted = artists.sort((a, b) => a.name.localeCompare(b.name));
    await cache.set(USER_ARTIST_KEY, JSON.stringify(artistSorted));
  }

  await cache.del(`/api/artists/${id}`);
  return newArtist;
};

const getArtistsReleases = async (): Promise<Track[]> => {
  const reply = await cache.get(USER_ARTIST_KEY);
  const artists: Artist[] = reply ? JSON.parse(reply) : await scraperService.artists();

  if (!artists.length) return [];
  return artists
    .map((artist) => [...artist.tracks])
    .reduce((previous, current) => [...previous, ...current])
    .filter((track) => track.released < new Date().getTime())
    .sort((a, b) => b.released - a.released);
};

const getArtistsUpcoming = async (): Promise<Track[]> => {
  const reply = await cache.get(USER_ARTIST_KEY);
  const artists: Artist[] = reply ? JSON.parse(reply) : await scraperService.artists();

  if (!artists.length) return [];
  return artists
    .map((artist) => [...artist.tracks])
    .reduce((previous, current) => [...previous, ...current])
    .filter((track) => track.released >= new Date().getTime())
    .sort((a, b) => b.released - a.released);
};

const getOneArtist = async (id: string): Promise<Artist> => {
  const reply = await cache.get(USER_ARTIST_KEY);
  const artists: Artist[] = reply ? JSON.parse(reply) : await scraperService.artists();

  const artist = artists.find((artist) => artist.id.toString() === id);
  if (artist) {
    artist.follow = true;
    return artist;
  }

  const [newArtists] = await beatportScrap.artists([+id]);
  return newArtists;
};

const deteleOneArtist = async (id: number): Promise<void> => {
  const artist = await db.artistsOnUser.findUnique({
    where: { userId_artistId: { userId: USER_ID, artistId: id } },
  });

  if (!artist) throw { status: 404, message: "artists not found" };

  await db.artistsOnUser.delete({
    where: { userId_artistId: { artistId: id, userId: USER_ID } },
  });

  const artiesUsed = await db.artistsOnUser.findMany({
    where: { artistId: id },
  });

  if (!artiesUsed.length) await db.artist.delete({ where: { id: id } });

  const reply = await cache.get(USER_ARTIST_KEY);

  if (!reply) {
    const artists = await scraperService.artists();
    artists.length && (await cache.set(USER_ARTIST_KEY, JSON.stringify(artists)));
  } else {
    const artists: Artist[] = JSON.parse(reply);
    const artistToRemove = artists.findIndex((artist) => artist.id === id);

    if (artistToRemove >= 0 && artists.length) {
      artists.splice(artistToRemove, 1);
      const artistsSorted = artists.sort((a, b) => a.name.localeCompare(b.name));
      await cache.set(USER_ARTIST_KEY, JSON.stringify(artistsSorted));
    }
  }

  await cache.del(`/api/artists/${id}`);
};

export default {
  getAllArtists,
  createNewArtist,
  getArtistsReleases,
  getArtistsUpcoming,
  getOneArtist,
  deteleOneArtist,
};
