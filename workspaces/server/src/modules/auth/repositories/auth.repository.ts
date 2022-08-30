import type { UserDB } from "@prisma/client";
import type { UserEmail, UserId } from "../../../core/domain";
import type { RegisterDTO } from "../dto";
import type { AuthRepository } from "./auth.repository.d";

import db from "../../../infra/database";

const authRepository: AuthRepository = {
  getUserByEmail: async (email: UserEmail): Promise<UserDB | null> => {
    return await db.userDB.findUnique({ where: { email: email } });
  },

  getUserById: async (userId: UserId): Promise<UserDB | null> => {
    return await db.userDB.findUnique({ where: { id: userId } });
  },

  createUser: async (credentials: RegisterDTO): Promise<UserDB> => {
    const { email, password } = credentials;

    return await db.userDB.create({
      data: { email: email, password: password, username: email, active: true },
    });
  },

  activeUserById: async (userId: UserId): Promise<void> => {
    await db.userDB.update({
      where: { id: userId },
      data: { active: true },
    });
  },
};

export default authRepository;
