import type { ApiParams } from "@br/core";
import dayjs from "dayjs";
import db from "../../database";

export default {
  async getReleasesByUserId(userId: number, params: ApiParams) {
    const { length, sort, order } = params;
    const lasMonthDate = dayjs(new Date()).subtract(1, "month").toDate();

    return await db.trackDB.findMany({
      ...(length && { take: +length }),
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
  },

  async getUpcomingsByUserId(userId: number, params: ApiParams) {
    const { length, sort, order } = params;

    return await db.trackDB.findMany({
      ...(length && { take: +length }),
      where: {
        OR: [
          {
            artists: {
              some: {
                users: {
                  some: { id: userId },
                },
              },
            },
            released: { gte: new Date() },
          },
          {
            label: {
              users: {
                some: { id: userId },
              },
            },
            released: { gte: new Date() },
          },
        ],
      },
      include: {
        remixers: true,
        label: true,
        genre: true,
        favorite: true,
        artists: { orderBy: { name: "desc" } },
      },
      orderBy: [
        ...(sort ? [{ [sort]: order ? order : "desc" }] : []),
        { released: "desc" },
        { label: { name: "desc" } },
      ],
    });
  },

  async getArtistsReleasesByUserId(userId: number) {
    const lasMonthDate = dayjs(new Date()).subtract(1, "month").toDate();

    return await db.trackDB.findMany({
      where: {
        artists: {
          some: {
            users: {
              some: { id: userId },
            },
          },
        },
        released: {
          lte: new Date(),
          gte: lasMonthDate,
        },
      },
      include: {
        artists: true,
        remixers: true,
        label: true,
        genre: true,
        favorite: true,
      },
      orderBy: [{ released: "desc" }, { label: { name: "desc" } }],
    });
  },

  async getArtistsUpcomingsByUserId(userId: number) {
    return await db.trackDB.findMany({
      where: {
        artists: {
          some: {
            users: {
              some: { id: userId },
            },
          },
        },
        released: { gte: new Date() },
      },
      include: {
        artists: true,
        remixers: true,
        label: true,
        genre: true,
        favorite: true,
      },
      orderBy: [{ released: "desc" }, { label: { name: "desc" } }],
    });
  },

  async getLabelsReleasesByUserId(userId: number) {
    const lasMonthDate = dayjs(new Date()).subtract(1, "month").toDate();

    return await db.trackDB.findMany({
      where: {
        label: { users: { some: { id: userId } } },
        released: { lte: new Date(), gte: lasMonthDate },
      },
      include: {
        artists: true,
        remixers: true,
        label: true,
        genre: true,
        favorite: true,
      },
      orderBy: [{ released: "desc" }, { label: { name: "desc" } }],
    });
  },

  async getLabelsUpcomingsByUserId(userId: number) {
    return await db.trackDB.findMany({
      where: {
        label: { users: { some: { id: userId } } },
        released: { gte: new Date() },
      },
      include: {
        artists: true,
        remixers: true,
        label: true,
        genre: true,
        favorite: true,
      },
      orderBy: [{ released: "desc" }, { label: { name: "desc" } }],
    });
  },

  async getAllTracksByArtistId(artistId: number) {
    return await db.trackDB.findMany({
      where: {
        artists: { some: { id: artistId } },
      },
      include: {
        artists: true,
        remixers: true,
        label: true,
        genre: true,
        favorite: true,
      },
      orderBy: [{ released: "desc" }, { label: { name: "desc" } }],
    });
  },

  async getAllTracksByLabelId(labelId: number) {
    return await db.trackDB.findMany({
      where: {
        label: { id: labelId },
      },
      include: {
        artists: true,
        remixers: true,
        label: true,
        genre: true,
        favorite: true,
      },
      orderBy: [{ released: "desc" }, { label: { name: "desc" } }],
    });
  },
};
