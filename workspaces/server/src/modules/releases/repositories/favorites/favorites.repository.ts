import type { Track } from "@br/core";
import type { UserId, ArtistId } from "../../../../core/domain";
import type { FavoriteRepo } from "../../interfaces";
import type { FavoritesRepository } from "./favorites.repository.d";

import db from "../../../../infra/database";

const favoriteRepository: FavoritesRepository = {
  getAllWithUserId: async (userId: UserId): Promise<FavoriteRepo[]> => {
    return await db.favoriteDB.findMany({
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
    });
  },

  save: async (track: Track, userId: UserId): Promise<FavoriteRepo | null> => {
    console.log("VALOR: ", userId);

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
                      where: { id: track.genre.id },
                      create: {
                        id: track.genre.id,
                        name: track.genre.name,
                        slug: track.genre.slug,
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
                  remixers: {
                    connectOrCreate: track.remixers.map((remixer) => ({
                      where: { id: remixer.id },
                      create: {
                        id: remixer.id,
                        name: remixer.name,
                        profile: "",
                      },
                    })),
                  },
                  artists: {
                    connectOrCreate: track.artists.map((artist) => ({
                      where: { id: artist.id },
                      create: {
                        id: artist.id,
                        name: artist.name,
                        profile: "",
                      },
                    })),
                  },
                },
              },
            },
          },
        },
      },
    });

    return await db.favoriteDB.findFirst({
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
  },

  delete: async (id: ArtistId): Promise<void> => {
    await db.favoriteDB.delete({ where: { id: id } });
  },

  isConnectedWithUser: async (id: ArtistId, userId: UserId): Promise<boolean> => {
    console.log("VALOR: ", userId);

    const favorite = await db.favoriteDB.findFirst({
      where: { userId: userId, trackId: id },
      select: { id: true },
    });

    return !!favorite;
  },
};

export default favoriteRepository;
