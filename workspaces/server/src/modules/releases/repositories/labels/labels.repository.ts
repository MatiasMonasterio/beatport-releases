import type { ApiParams } from "@br/core";
import type { UserId, LabelId } from "../../../../core/domain";
import type { LabelRepo } from "../../interfaces";
import type { ScraperLabelDTO } from "../../../scraper";
import type { LabelsRepository } from "./labels.repository.d";

import db from "../../../../infra/database";

const getLabelInclude = () => ({
  include: {
    _count: { select: { tracks: true } },
    users: { select: { id: true } },
  },
});

const labelsRepository: LabelsRepository = {
  getAllByUserId: async (userId: UserId, params: ApiParams): Promise<LabelRepo[]> => {
    const { length, sort, order } = params;

    return await db.labelDB.findMany({
      where: { users: { some: { id: userId } } },
      ...getLabelInclude(),
      ...(length && { take: length }),
      orderBy: [...(sort ? [{ [sort]: order ? order : "desc" }] : []), { name: "asc" }],
    });
  },

  getOneById: async (labelId: LabelId): Promise<LabelRepo | null> => {
    return db.labelDB.findFirst({
      where: { id: labelId },
      ...getLabelInclude(),
    });
  },

  saveAndConnectWithUser: async (label: ScraperLabelDTO, userId: UserId): Promise<LabelRepo> => {
    const transaction = await db.$transaction([
      ...label.tracks.map((track) =>
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
        })
      ),
      db.labelDB.update({
        where: { id: label.id },
        data: {
          profile: "",
          artwork: label.artwork,
          tracks: {
            connect: label.tracks.map((track) => ({
              id: track.id,
            })),
          },
          users: {
            connect: { id: userId },
          },
        },
        ...getLabelInclude(),
      }),
    ]);

    return transaction[transaction.length - 1] as LabelRepo;
  },

  connectWithUser: async (labelId: LabelId, userId: UserId): Promise<void> => {
    await db.labelDB.update({
      where: { id: labelId },
      data: { users: { connect: { id: userId } } },
    });
  },

  disconnectWithUser: async (labelId: LabelId, userId: UserId): Promise<void> => {
    await db.labelDB.update({
      where: { id: labelId },
      data: { users: { disconnect: { id: userId } } },
    });
  },

  isConnectedWithUser: async (labelId: LabelId, userId: UserId): Promise<boolean> => {
    const labelExist = await db.labelDB.findFirst({
      where: { id: labelId, users: { some: { id: userId } } },
      select: { id: true },
    });

    return !!labelExist;
  },
};

export default labelsRepository;
