import type { UserDB } from "@prisma/client";
import type { UserId } from "../../../../core/domain";
import type { UsersRepository } from "./users.repository.d";

import db from "../../../../infra/database";

const usersRepository: UsersRepository = {
  getOneById: async (userId: UserId): Promise<UserDB | null> => {
    return await db.userDB.findUnique({ where: { id: userId } });
  },
};

export default usersRepository;
