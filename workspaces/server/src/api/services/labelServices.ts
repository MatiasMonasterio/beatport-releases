import { Label } from "@br/core";

import db from "../../database";
import cache from "../../cache";
import { beatportScrap } from "../../utils";

import { labelAdapter } from "../adapters";

interface ParamsFilter {
  sort?: keyof Label;
  order?: "desc" | "asc";
  length?: number;
  userId: number;
}

import type { TrackDB, ArtistDB, GenreDB, FavoriteDB, LabelDB } from "@prisma/client";
interface TracksExtended extends TrackDB {
  artists: ArtistDB[];
  remixers: ArtistDB[];
  favorite: FavoriteDB[];
  genre: GenreDB | null;
  label: LabelDB | null;
}

interface LabelAndTracks extends LabelDB {
  tracks: TracksExtended[];
}

const getAllLabels = async ({ userId, length, sort, order }: ParamsFilter): Promise<Label[]> => {
  const labels = await db.labelDB.findMany({
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

  return labels.map((label) => labelAdapter(label));
};

const createNewLabel = async (id: number, userId: number): Promise<Label> => {
  let label = await db.labelDB.findFirst({
    where: {
      id: id,
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

  if (label && !label.artwork) {
    throw { status: 409, message: "Label already exist" };
  }

  label = await db.labelDB.findUnique({
    where: { id: id },
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

  if (label && label.artwork) {
    await db.labelDB.update({
      where: { id: id },
      data: {
        users: {
          connect: { id: userId },
        },
      },
    });

    return labelAdapter(label);
  }

  let newLabel = null;
  const labelOnCache = await cache.get<Label>(`/label/${id}`);

  if (labelOnCache) {
    newLabel = labelOnCache;
  } else {
    const [label] = await beatportScrap.labels([{ id: id }]);
    newLabel = label;
  }

  if (newLabel.tracks.length) {
    const transacion = await db.$transaction([
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

    return labelAdapter(transacion[transacion.length - 1] as LabelAndTracks);
  }

  const newLabelInDb = await db.labelDB.create({
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

  return labelAdapter(newLabelInDb);
};

const getOneLabel = async (id: number, userId: number): Promise<Label> => {
  const label = await db.labelDB.findFirst({
    where: { id: id },
    include: {
      users: true,
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

  if (label && label.artwork) {
    return labelAdapter(label, userId);
  }

  const labelOnCache = await cache.get<Label>(`/label/${id}`);
  if (labelOnCache) return labelOnCache;

  const [newLabel] = await beatportScrap.labels([{ id }]);
  cache.set(`/label/${id}`, newLabel);

  return newLabel;
};

const deteleOneLabel = async (id: number, userId: number): Promise<void> => {
  const label = await db.labelDB.findFirst({
    where: { id: id, users: { some: { id: userId } } },
  });

  if (!label) {
    throw { status: 404, message: "label not found" };
  }

  await db.labelDB.update({
    where: { id: id },
    data: {
      users: {
        disconnect: { id: userId },
      },
    },
  });
};

export default {
  getAllLabels,
  createNewLabel,
  getOneLabel,
  deteleOneLabel,
};
