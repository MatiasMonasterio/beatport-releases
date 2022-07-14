import type { Request, Response, NextFunction } from "express";

import db from "../../database";
import { beatportScrap } from "../../utils";

export default async function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  const userId = req.userId;

  try {
    const user = await db.userDB.findFirst({
      where: { id: +userId, updatedAt: { gte: new Date() } },
    });

    if (!user) {
      return next();
    }

    const artists = await db.artistDB.findMany({
      where: {
        users: { some: { id: +userId } },
        updatedAt: { gte: new Date() },
      },
      select: { id: true },
    });

    const labels = await db.labelDB.findMany({
      where: {
        users: { some: { id: +req.userId } },
        updatedAt: { gte: new Date() },
      },
      select: { id: true },
    });

    const artistsScraped = await beatportScrap.artists(artists);
    const labelsScraped = await beatportScrap.labels(labels);

    const artistsTracks = artistsScraped
      .map((artists) => artists.tracks)
      .reduce((prev, curr) => [...prev, ...curr], []);

    const labelsTracks = labelsScraped
      .map((label) => label.tracks)
      .reduce((prev, curr) => [...prev, ...curr], []);

    await db.$transaction([
      ...[...artistsTracks, ...labelsTracks].map((track) =>
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
      ...artistsScraped.map((artist) =>
        db.artistDB.update({
          where: { id: artist.id },
          data: {
            tracks: {
              connect: artist.tracks.map((track) => ({ id: track.id })),
            },
          },
        })
      ),
      ...labelsScraped.map((label) =>
        db.labelDB.update({
          where: { id: label.id },
          data: {
            tracks: {
              connect: label.tracks.map((track) => ({ id: track.id })),
            },
          },
        })
      ),
    ]);

    next();
  } catch (error) {
    res.status(500).send({ status: "FAILD", message: "update data error" });
  }
}
