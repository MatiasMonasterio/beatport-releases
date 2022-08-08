import type { ApiParams, Label } from "@br/core";
import type { LabelWithTracks } from "../../types";

import db from "../../database";

export default {
  async isConnectedWithUser(id: number, userId: number) {
    const label = await db.labelDB.findFirst({
      where: { id: id, users: { some: { id: userId } } },
      select: { id: true },
    });

    return !!label;
  },

  async getAllByUserId(userId: number, params: ApiParams) {
    const { length, sort, order } = params;

    return await db.labelDB.findMany({
      ...(length && { take: +length }),
      where: { users: { some: { id: userId } } },
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

  async getOneByIdAndUserId(labelId: number, userId: number) {
    return await db.labelDB.findFirst({
      where: {
        id: labelId,
        users: { some: { id: userId } },
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

  async getOneById(labelId: number) {
    return await db.labelDB.findUnique({
      where: { id: labelId },
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
        users: true,
      },
    });
  },

  async connectWithUser(labelId: number, userId: number) {
    return await db.labelDB.update({
      where: { id: labelId },
      data: {
        users: {
          connect: { id: userId },
        },
      },
    });
  },

  async disconnectWithUser(labelId: number, userId: number) {
    return await db.labelDB.update({
      where: { id: labelId },
      include: { users: true },
      data: {
        users: {
          disconnect: { id: userId },
        },
      },
    });
  },

  async saveWithTracks(newLabel: Label, userId: number) {
    const transaction = await db.$transaction([
      ...newLabel.tracks.map((track) =>
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
      db.labelDB.update({
        where: { id: newLabel.id },
        data: {
          profile: newLabel.profile || "",
          artwork: newLabel.artwork,
          tracks: {
            connect: newLabel.tracks.map((track) => ({
              id: track.id,
            })),
          },
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

    return transaction[transaction.length - 1] as LabelWithTracks;
  },

  async save(newLabel: Label, userId: number) {
    return await db.labelDB.create({
      data: {
        id: newLabel.id,
        name: newLabel.name,
        artwork: newLabel.artwork,
        profile: newLabel.profile || "",
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
