import type { Request, Response, NextFunction } from "express";
import type { UserId } from "../../../../../core/domain";

import dayjs from "dayjs";

import db from "../../../../../infra/database";
import { scraperService } from "../../../../scraper";

export default async function isAuthenticated(req: Request, _res: Response, next: NextFunction) {
  const userId: UserId = req.decode.id;
  const currentDate = dayjs(new Date()).startOf("day").toDate();

  try {
    const user = await db.userDB.findFirst({
      where: { id: userId, updatedAt: { lt: currentDate } },
    });

    if (!user) return next();

    const artists = await db.artistDB.findMany({
      where: {
        users: { some: { id: userId } },
        updatedAt: { lt: currentDate },
      },
      select: { id: true },
    });

    const labels = await db.labelDB.findMany({
      where: {
        users: { some: { id: req.decode.id } },
        updatedAt: { lt: currentDate },
      },
      select: { id: true },
    });

    const artistsScraped = await scraperService.getArtistsByIds(artists.map((artist) => artist.id));
    const labelsScraped = await scraperService.getLabelsByIds(labels.map((label) => label.id));

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

    await db.userDB.update({
      where: { id: userId },
      data: { updatedAt: new Date() },
    });

    next();
  } catch (error) {
    next(error);
  }
}
