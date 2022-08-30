import type { UserDB } from "@prisma/client";
import type { UserEmail, UserId } from "../../../core/domain";
import type { RegisterDTO } from "../dto";

export interface AuthRepository {
  getUserByEmail: (email: UserEmail) => Promise<UserDB | null>;
  getUserById: (userId: UserId) => Promise<UserDB | null>;
  createUser: (credentials: RegisterDTO) => Promise<UserDB>;
  activeUserById: (userId: UserId) => Promise<void>;
}
