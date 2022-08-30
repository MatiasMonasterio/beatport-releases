import { UserDB } from "@prisma/client";
import type { UserId } from "../../../../core/domain";

export interface UsersRepository {
  getOneById: (userId: UserId) => Promise<UserDB | null>;
}
