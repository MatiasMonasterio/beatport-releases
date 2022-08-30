import type { ApiParams } from "@br/core";
import type { UserId, ArtistId, LabelId } from "../../../../core/domain";
import type { TrackRepo } from "../../interfaces";
import type { TracksRepository } from "./tracks.repository.d";

import dayjs from "dayjs";
import db from "../../../../infra/database";

interface GetTracksFromDbArgs {
  params: ApiParams;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  where?: any;
}

const getAllTracks = async ({ params, where }: GetTracksFromDbArgs): Promise<TrackRepo[]> => {
  const { length, sort, order } = params;

  return await db.trackDB.findMany({
    ...(length && { take: +length }),
    where: where,
    include: {
      artists: true,
      remixers: true,
      label: true,
      genre: true,
      favorite: true,
    },
    orderBy: [
      ...(sort ? [{ [sort]: order ? order : "desc" }] : []),
      { released: "desc" },
      { label: { name: "desc" } },
    ],
  });
};

const tracksRepository: TracksRepository = {
  getAllReleasesByUserId: async (userId: UserId, params: ApiParams): Promise<TrackRepo[]> => {
    const lasMonthDate = dayjs(new Date()).subtract(1, "month").toDate();

    return await getAllTracks({
      params: params,
      where: {
        OR: [
          {
            artists: { some: { users: { some: { id: userId } } } },
            released: { lte: new Date(), gte: lasMonthDate },
          },
          {
            label: { users: { some: { id: userId } } },
            released: { lte: new Date(), gte: lasMonthDate },
          },
        ],
      },
    });
  },

  getUpcomingsByUserId: async (userId: UserId, params: ApiParams): Promise<TrackRepo[]> => {
    return await getAllTracks({
      params: params,
      where: {
        OR: [
          {
            artists: { some: { users: { some: { id: userId } } } },
            released: { gte: new Date() },
          },
          {
            label: { users: { some: { id: userId } } },
            released: { gte: new Date() },
          },
        ],
      },
    });
  },

  getArtistsReleasesByUserId: async (userId: UserId, params: ApiParams): Promise<TrackRepo[]> => {
    const lasMonthDate = dayjs(new Date()).subtract(1, "month").toDate();

    return await getAllTracks({
      params: params,
      where: {
        artists: { some: { users: { some: { id: userId } } } },
        released: { lte: new Date(), gte: lasMonthDate },
      },
    });
  },

  getArtistsUpcomingsByUserId: async (userId: UserId, params: ApiParams): Promise<TrackRepo[]> => {
    return await getAllTracks({
      params: params,
      where: {
        artists: { some: { users: { some: { id: userId } } } },
        released: { gte: new Date() },
      },
    });
  },

  getLabelsReleasesByUserId: async (userId: UserId): Promise<TrackRepo[]> => {
    const lasMonthDate = dayjs(new Date()).subtract(1, "month").toDate();

    return await getAllTracks({
      params: {},
      where: {
        label: { users: { some: { id: userId } } },
        released: { lte: new Date(), gte: lasMonthDate },
      },
    });
  },

  getLabelsUpcomingsByUserId: async (userId: UserId): Promise<TrackRepo[]> => {
    return await getAllTracks({
      params: {},
      where: {
        label: { users: { some: { id: userId } } },
        released: { gte: new Date() },
      },
    });
  },

  getAllTracksByArtistId: async (artistId: ArtistId): Promise<TrackRepo[]> => {
    return await getAllTracks({
      params: {},
      where: { artists: { some: { id: artistId } } },
    });
  },

  getAllTracksByLabelId: async (labelId: LabelId): Promise<TrackRepo[]> => {
    return await getAllTracks({
      params: {},
      where: { label: { id: labelId } },
    });
  },
};

export default tracksRepository;
