import type { ApiParams, Artist } from "@br/core";
import type { ArtistWithTracks } from "../../types";

import db from "../../database";

export default {
  async isConnectedWithUser(id: number, userId: number) {
    const artist = await db.artistDB.findFirst({
      where: { id: id, users: { some: { id: userId } } },
      select: { id: true },
    });

    return !!artist;
  },

  async getAllByUserId(userId: number, params: ApiParams) {
    const { length, sort, order } = params;

    return await db.artistDB.findMany({
      ...(length && { take: +length }),
      where: {
        users: {
          some: { id: userId },
        },
      },
      include: {
        tracks: {
          include: {
            artists: true,
            remixers: true,
            label: true,
            genre: true,
            favorite: true,
          },
        },
      },
      orderBy: [...(sort ? [{ [sort]: order ? order : "desc" }] : []), { name: "asc" }],
    });
  },

  async getOneByIdAndUserId(artistId: number, userId: number) {
    return await db.artistDB.findFirst({
      where: {
        id: artistId,
        users: { some: { id: userId } },
      },
    });
  },

  async getOneById(artistId: number) {
    return await db.artistDB.findUnique({
      where: { id: artistId },
      include: {
        tracks: {
          include: {
            artists: true,
            remixers: true,
            label: true,
            genre: true,
            favorite: true,
          },
          orderBy: { released: "desc" },
        },
        users: true,
      },
    });
  },

  async connectWithUser(artistId: number, userId: number) {
    return await db.userDB.update({
      where: { id: userId },
      data: {
        artists: {
          connect: { id: artistId },
        },
      },
    });
  },

  async disconnectWithUser(artistId: number, userId: number) {
    return await db.artistDB.update({
      where: { id: artistId },
      include: { users: true },
      data: {
        users: {
          disconnect: { id: userId },
        },
      },
    });
  },

  async saveWithTracks(newArtist: Artist, userId: number) {
    const transaction = await db.$transaction([
      ...newArtist.tracks.map((track) =>
        db.trackDB.upsert({
          where: { id: track.id },
          update: {},
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
        })
      ),
      db.artistDB.update({
        where: { id: newArtist.id },
        data: {
          profile: newArtist.profile || "",
          artwork: newArtist.artwork,
          ...(newArtist.tracks.length && {
            tracks: {
              connect: newArtist.tracks.map((track) => ({ id: track.id })),
            },
          }),
          users: {
            connect: { id: userId },
          },
        },
        include: {
          tracks: {
            include: {
              artists: true,
              remixers: true,
              label: true,
              genre: true,
              favorite: true,
            },
          },
        },
      }),
    ]);

    return transaction[transaction.length - 1] as ArtistWithTracks;
  },

  async save(newArtist: Artist, userId: number) {
    return await db.artistDB.create({
      data: {
        id: newArtist.id,
        name: newArtist.name,
        profile: newArtist.profile || "",
        artwork: newArtist.artwork,
        users: {
          connect: { id: userId },
        },
      },
      include: {
        tracks: {
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
};
