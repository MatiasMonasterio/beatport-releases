import type { Track } from "@br/core";

import dayjs from "dayjs";

import db from "../../database";
import { trackAdapter } from "../adapters";

interface ParamsFilter {
  sort?: keyof Track;
  order?: "desc" | "asc";
  length?: number;
  userId: number;
}

const createNewsTracks = async (tracks: Track[]): Promise<void> => {
  try {
    await db.trackDB.createMany({
      data: tracks.map((track) => ({
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
      })),
      skipDuplicates: true,
    });
  } catch (error) {
    console.error(error);
  }
};

const getAllReleases = async ({ userId }: ParamsFilter): Promise<Track[]> => {
  const lasMonthDate = dayjs(new Date()).subtract(1, "month").toDate();

  const releases = await db.trackDB.findMany({
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
    orderBy: [{ released: "desc" }, { label: { name: "desc" } }],
  });

  return releases.map((release) => trackAdapter(release, userId));
};

const getAllUpcomings = async (userId: number): Promise<Track[]> => {
  const releases = await db.trackDB.findMany({
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
    orderBy: [{ released: "desc" }, { label: { name: "desc" } }],
  });

  return releases.map((release) => trackAdapter(release, userId));
};

const getArtistsReleases = async (userId: number): Promise<Track[]> => {
  const lasMonthDate = dayjs(new Date()).subtract(1, "month").toDate();

  const releases = await db.trackDB.findMany({
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

  return releases.map((release) => trackAdapter(release, userId));
};

const getArtistsUpcoming = async (userId: number): Promise<Track[]> => {
  const releases = await db.trackDB.findMany({
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

  return releases.map((release) => trackAdapter(release, userId));
};

const getLabelsReleases = async (userId: number): Promise<Track[]> => {
  const lasMonthDate = dayjs(new Date()).subtract(1, "month").toDate();

  const releases = await db.trackDB.findMany({
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

  return releases.map((release) => trackAdapter(release, userId));
};

const getLabelsUpcoming = async (userId: number): Promise<Track[]> => {
  const upcomings = await db.trackDB.findMany({
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

  return upcomings.map((upcoming) => trackAdapter(upcoming, userId));
};

export default {
  createNewsTracks,
  getAllReleases,
  getAllUpcomings,
  getArtistsReleases,
  getArtistsUpcoming,
  getLabelsReleases,
  getLabelsUpcoming,
};
