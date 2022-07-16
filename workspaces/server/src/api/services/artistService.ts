import type { Artist } from "@br/core";

import db from "../../database";
import cache from "../../cache";
import { beatportScrap } from "../../utils";

import { artistAdapter } from "../adapters";

interface ParamsFilter {
  sort?: keyof Artist;
  order?: "desc" | "asc";
  length?: string;
  userId: number;
}

import { TrackDB, ArtistDB, FavoriteDB, GenreDB, LabelDB } from "@prisma/client";
interface TracksExtended extends TrackDB {
  artists: ArtistDB[];
  remixers: ArtistDB[];
  favorite: FavoriteDB[];
  genre: GenreDB | null;
  label: LabelDB | null;
}

interface ArtistAndTracks extends ArtistDB {
  tracks: TracksExtended[];
}

const getAllArtists = async ({ userId }: ParamsFilter): Promise<Artist[]> => {
  const artists = await db.artistDB.findMany({
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
    orderBy: [{ name: "asc" }],
  });

  return artists.map((artist) => artistAdapter(artist));
};

const createNewArtist = async (id: number, userId: number): Promise<Artist> => {
  let artist = await db.artistDB.findFirst({
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

  // Encontro un artists relacionado al usuario y este esta actualizado
  if (artist && artist.artwork) {
    throw { status: 409, message: "Artists already exist" };
  }

  artist = await db.artistDB.findUnique({
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

  // encontro al artista, este esta actualizado, pero no esta relacionado con el usuario
  if (artist && artist.artwork && artist.updatedAt === new Date()) {
    await db.userDB.update({
      where: { id: userId },
      data: {
        artists: {
          connect: { id: artist.id },
        },
      },
    });

    return artistAdapter(artist, userId);
  }

  let newArtist = null;
  const artistOnCache = await cache.get<Artist>(`/artist/${id}`);

  if (artistOnCache) {
    newArtist = artistOnCache;
  } else {
    const [artist] = await beatportScrap.artists([{ id: id }]);
    newArtist = artist;
  }
  // a partir de aca no encontro a el artists o este no esta actualizado

  if (newArtist.tracks.length) {
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

    return artistAdapter(transaction[transaction.length - 1] as ArtistAndTracks);
  }

  const newArtistDb = await db.artistDB.create({
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

  return artistAdapter(newArtistDb);
};

const getOneArtist = async (id: string, userId: number): Promise<Artist> => {
  const artist = await db.artistDB.findUnique({
    where: { id: +id },
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

  if (artist && artist.artwork) {
    return artistAdapter(artist, userId);
  }

  const artistOnCache = await cache.get<Artist>(`/artist/${id}`);
  if (artistOnCache) return artistOnCache;

  const [artistScreped] = await beatportScrap.artists([{ id: +id }]);
  cache.set(`/artist/${id}`, artistScreped);

  return artistScreped;
};

const deteleOneArtist = async (id: number, userId: number): Promise<void> => {
  const artist = await db.artistDB.findFirst({
    where: {
      id: id,
      users: {
        some: { id: userId },
      },
    },
  });

  if (!artist) throw { status: 404, message: "artists not found" };

  await db.artistDB.update({
    where: { id: id },
    include: { users: true },
    data: {
      users: {
        disconnect: { id: userId },
      },
    },
  });
};

export default {
  getAllArtists,
  createNewArtist,
  getOneArtist,
  deteleOneArtist,
};
