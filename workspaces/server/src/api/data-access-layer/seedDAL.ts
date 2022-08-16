import type { User, Artist, Label } from "@br/core";

import db from "../../database";
import { NODE_ENV } from "../../config/constants";

export default {
  restartAndLoadData: async (user: User, artists: Artist[], labels: Label[]) => {
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
          artists: {
            connectOrCreate: artists.map((artist) => ({
              where: { id: artist.id },
              create: {
                id: artist.id,
                name: artist.name,
                profile: artist.profile || "",
                artwork: artist.artwork,
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
              },
            })),
          },
        },
      }),
    ]);

    return;
  },
};
