import type { Track, Favorite } from "@br/core";

import db from "../../database";
import { favoriteAdapter } from "../adapters";

const getAllFavorites = async (userId: number): Promise<Favorite[]> => {
  const favorites = await db.favoriteDB.findMany({
    where: { userId: userId },
    include: {
      track: {
        include: {
          artists: true,
          remixers: true,
          label: true,
          genre: true,
          favorite: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return favorites.map((favorite) => favoriteAdapter(favorite, userId));
};

const createNewFavorite = async (track: Track, userId: number): Promise<Favorite> => {
  const favorite = await db.favoriteDB.findFirst({
    where: { userId: userId, trackId: track.id },
  });

  if (favorite) {
    throw { status: 409, message: "Track already exist" };
  }

  const remixersConnecter = track.remixers.map((remixer) => ({
    where: { id: remixer.id },
    create: {
      id: remixer.id,
      name: remixer.name,
      profile: "",
    },
  }));

  const artistsConnecter = track.artists.map((artist) => ({
    where: { id: artist.id },
    create: {
      id: artist.id,
      name: artist.name,
      profile: "",
    },
  }));

  await db.userDB.update({
    where: { id: userId },
    include: { favorites: true },
    data: {
      favorites: {
        create: {
          track: {
            connectOrCreate: {
              where: { id: track.id },
              create: {
                id: track.id,
                bpm: track.bpm,
                released: new Date(track.released),
                artwork: track.artwork,
                key: track.key as string,
                mix: track.mix,
                name: track.name,
                preview: track.preview,
                genre: {
                  connectOrCreate: {
                    where: { id: track.genres[0].id },
                    create: {
                      id: track.genres[0].id,
                      name: track.genres[0].name,
                      slug: track.genres[0].slug,
                    },
                  },
                },
                label: {
                  connectOrCreate: {
                    where: { id: track.label.id },
                    create: {
                      id: track.label.id,
                      name: track.label.name,
                      profile: "",
                    },
                  },
                },
                remixers: { connectOrCreate: remixersConnecter },
                artists: { connectOrCreate: artistsConnecter },
              },
            },
          },
        },
      },
    },
  });

  const newFavorite = await db.favoriteDB.findFirst({
    where: { userId: userId, trackId: track.id },
    include: {
      track: {
        include: {
          artists: true,
          remixers: true,
          label: true,
          genre: true,
          favorite: true,
        },
      },
    },
  });

  if (!newFavorite) {
    throw { code: 500, message: "Error getting favorite" };
  } else {
    return favoriteAdapter(newFavorite, userId);
  }
};

const deleteOneFavorite = async (id: number, userId: number): Promise<void> => {
  const favorite = await db.favoriteDB.findFirst({
    where: { trackId: id, userId: userId },
  });

  if (!favorite) {
    throw { code: 404, message: "favorite not found" };
  }

  await db.favoriteDB.delete({ where: { id: favorite.id } });
};

export default {
  getAllFavorites,
  createNewFavorite,
  deleteOneFavorite,
};
