import type { User, Artist, Label } from "@br/core";
import type { SeedRepository } from "./seed.repository.d";

import db from "../../../../infra/database";
import { NODE_ENV } from "../../../../config/env";
import dayjs from "dayjs";

const seedRepository: SeedRepository = {
  restartAndLoadData: async (user: User, artists: Artist[], labels: Label[]): Promise<void> => {
    if (NODE_ENV === "production") return;

    await db.$transaction([
      db.favoriteDB.deleteMany(),
      db.trackDB.deleteMany(),
      db.labelDB.deleteMany(),
      db.artistDB.deleteMany(),
      db.userDB.deleteMany(),
      db.userDB.create({
        data: {
          username: user.username,
          email: user.email,
          password: user.password,
          active: true,
          updatedAt: dayjs().subtract(1, "days").toDate(),
          createdAt: dayjs().subtract(1, "days").toDate(),
          artists: {
            connectOrCreate: artists.map((artist) => ({
              where: { id: artist.id },
              create: {
                id: artist.id,
                name: artist.name,
                profile: artist.profile || "",
                artwork: artist.artwork,
                updatedAt: dayjs().subtract(1, "days").toDate(),
                createdAt: dayjs().subtract(1, "days").toDate(),
              },
            })),
          },
          labels: {
            connectOrCreate: labels.map((label) => ({
              where: { id: label.id },
              create: {
                id: label.id,
                name: label.name,
                profile: label.profile || "",
                artwork: label.artwork,
                updatedAt: dayjs().subtract(1, "days").toDate(),
                createdAt: dayjs().subtract(1, "days").toDate(),
              },
            })),
          },
        },
      }),
    ]);

    return;
  },
};

export default seedRepository;
