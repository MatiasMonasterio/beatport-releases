import type { ApiParams } from "@br/core";
import type { UserId, ArtistId } from "../../../../core/domain";
import type { ScraperArtistDTO } from "../../../scraper";
import type { ArtistRepo } from "../../interfaces";
import type { ArtistRepository } from "./artists.repository.d";

import db from "../../../../infra/database";

const getArtistInclude = () => ({
  include: {
    _count: { select: { tracks: true } },
    users: { select: { id: true } },
  },
});

const artistRepository: ArtistRepository = {
  exist: async (artistId: ArtistId): Promise<boolean> => {
    const artistExist = await db.artistDB.findUnique({
      where: { id: artistId },
      select: { id: true },
    });

    return !!artistExist;
  },

  deleteOne: async (artistId: ArtistId): Promise<void> => {
    await db.artistDB.delete({ where: { id: artistId } });
  },

  getOneById: async (artistId: ArtistId): Promise<ArtistRepo | null> => {
    return await db.artistDB.findUnique({
      where: { id: artistId },
      ...getArtistInclude(),
    });
  },

  getAllByUserId: async (userId: UserId, params: ApiParams): Promise<ArtistRepo[]> => {
    const { length, sort, order } = params;

    return await db.artistDB.findMany({
      where: { users: { some: { id: userId } } },
      ...getArtistInclude(),
      ...(length && { take: length }),
      orderBy: [...(sort ? [{ [sort]: order ? order : "desc" }] : []), { name: "asc" }],
    });
  },

  saveAndConnectWithUser: async (artist: ScraperArtistDTO, userId: UserId): Promise<ArtistRepo> => {
    const transaction = await db.$transaction([
      ...artist.tracks.map((track) =>
        db.trackDB.upsert({
          where: { id: track.id },
          update: {},
          create: {
            id: track.id,
            bpm: track.bpm,
            released: new Date(track.released),
            artwork: track.artwork,
            key: track.key,
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
      db.artistDB.update({
        where: { id: artist.id },
        data: {
          profile: "",
          artwork: artist.artwork,
          ...(artist.tracks.length && {
            tracks: { connect: artist.tracks.map((track) => ({ id: track.id })) },
          }),
          users: { connect: { id: userId } },
        },
        ...getArtistInclude(),
      }),
    ]);

    return transaction[transaction.length - 1] as ArtistRepo;
  },

  isConnectedWithUser: async (artistId: ArtistId, userId: UserId): Promise<boolean> => {
    const artist = await db.artistDB.findFirst({
      where: { id: artistId, users: { some: { id: userId } } },
      select: { id: true },
    });

    return !!artist;
  },

  connectWithUser: async (artistId: ArtistId, userId: UserId): Promise<void> => {
    await db.userDB.update({
      where: { id: userId },
      data: { artists: { connect: { id: artistId } } },
    });
  },

  disconnectWithUser: async (artistId: ArtistId, userId: UserId): Promise<void> => {
    await db.artistDB.update({
      where: { id: artistId },
      data: { users: { disconnect: { id: userId } } },
    });
  },
};

export default artistRepository;
