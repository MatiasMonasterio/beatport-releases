import type { Track } from "@br/core";

import db from "../../database";

export default {
  isConnectedWithUser: async (id: number, userId: number) => {
    const favorite = await db.favoriteDB.findFirst({
      where: { userId: userId, trackId: id },
      select: { id: true },
    });

    return !!favorite;
  },

  getAllWithUserId: async (userId: number) => {
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
      orderBy: { createdAt: "desc" },
    });
  },

  save: async (track: Track, userId: number) => {
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

  delete: async (id: number) => {
    await db.favoriteDB.delete({ where: { id: id } });
  },
};
