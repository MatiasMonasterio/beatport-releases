import type { Track, FavoriteTrack } from "@br/core";

import db from "../../database";
import cache from "../../cache";

const USER_ID = 1;
const USER_FAVORITES_KEY = `FAVORITES-${USER_ID}`;

const getAllFavorites = async (): Promise<FavoriteTrack[]> => {
  let favorites: FavoriteTrack[] | null = await cache.get<FavoriteTrack[]>(USER_FAVORITES_KEY);

  if (!favorites) {
    const favoritesDb = await db.favoriteTracksOnUser.findMany({
      where: { userId: USER_ID },
      orderBy: { createdAt: "desc" },
      select: { favoriteTrack: true },
    });

    favorites = favoritesDb.map((favorite) => {
      return {
        ...favorite.favoriteTrack,
        createdAt: new Date(favorite.favoriteTrack.createdAt).getTime(),
        updatedAt: new Date(favorite.favoriteTrack.updatedAt).getTime(),
      };
    });

    favorites && (await cache.set<FavoriteTrack[]>(USER_FAVORITES_KEY, favorites));
  }

  if (favorites) {
    favorites = favorites.map((favorite) => ({
      ...favorite,
      artists: JSON.parse(favorite.artists),
      genres: JSON.parse(favorite.genres),
      label: JSON.parse(favorite.label),
      remixers: JSON.parse(favorite.remixers),
      favorite: true,
    }));
  }

  return favorites ? favorites : [];
};

const getAllFavoritesIds = async (): Promise<number[]> => {
  const favorites = await db.favoriteTracksOnUser.findMany({
    where: { userId: USER_ID },
    select: { favoriteTrackId: true },
  });

  return favorites.map((favorite) => favorite.favoriteTrackId);
};

const createNewFavorite = async (track: Track): Promise<FavoriteTrack> => {
  const favoriteExist = await db.favoriteTracksOnUser.findUnique({
    where: { userId_favoriteTrackId: { favoriteTrackId: track.id, userId: USER_ID } },
  });

  if (favoriteExist) throw { status: 409, message: "Track already exist" };

  const { id, artists, bpm, released, genres, artwork, key, label, mix, remixers, name, preview } =
    track;

  const newFavorite = {
    id,
    artists: JSON.stringify(artists),
    bpm,
    released,
    genres: JSON.stringify(genres),
    artwork,
    // change schema to key
    key: key as string,
    label: JSON.stringify(label),
    mix,
    remixers: JSON.stringify(remixers),
    name,
    preview,
  };

  let favorite = await db.favoriteTrack.findFirst({ where: { id: id } });
  if (!favorite) favorite = await db.favoriteTrack.create({ data: newFavorite });
  await db.favoriteTracksOnUser.create({ data: { userId: USER_ID, favoriteTrackId: id } });

  const favorites = await cache.get<FavoriteTrack[]>(USER_FAVORITES_KEY);
  const favoriteToSave = {
    ...favorite,
    createdAt: new Date(favorite.createdAt).getTime(),
    updatedAt: new Date(favorite.updatedAt).getTime(),
  };

  if (!favorites) {
    await cache.set<FavoriteTrack[]>(USER_FAVORITES_KEY, [favoriteToSave]);
  } else {
    favorites.push(favoriteToSave);

    const favoritesSorted = favorites.sort((a, b) => {
      return a.createdAt && b.createdAt ? b.createdAt - a.createdAt : -1;
    });

    await cache.set<FavoriteTrack[]>(USER_FAVORITES_KEY, favoritesSorted);
  }

  return favoriteToSave;
};

const deleteOneFavorite = async (id: number): Promise<void> => {
  const favoriteExist = await db.favoriteTracksOnUser.findUnique({
    where: { userId_favoriteTrackId: { favoriteTrackId: id, userId: USER_ID } },
  });

  if (!favoriteExist) throw { status: 494, message: "Track not found" };

  await db.favoriteTracksOnUser.delete({
    where: { userId_favoriteTrackId: { favoriteTrackId: id, userId: USER_ID } },
  });

  const favoriteUsed = await db.favoriteTracksOnUser.findMany({
    where: { favoriteTrackId: id },
  });

  if (!favoriteUsed.length) await db.favoriteTrack.delete({ where: { id: id } });

  const favorites = await cache.get<FavoriteTrack[]>(USER_FAVORITES_KEY);
  if (favorites?.length) {
    const favoriteToRemove = favorites.findIndex((favorite) => favorite.id === id);

    if (favoriteToRemove >= 0 && favorites.length) {
      favorites.splice(favoriteToRemove, 1);

      const favoriteSorted = favorites.sort((a, b) => {
        return a.createdAt && b.createdAt ? b.createdAt - a.createdAt : -1;
      });

      await cache.set<FavoriteTrack[]>(USER_FAVORITES_KEY, favoriteSorted);
    }
  }
};

export default {
  getAllFavorites,
  getAllFavoritesIds,
  createNewFavorite,
  deleteOneFavorite,
};
