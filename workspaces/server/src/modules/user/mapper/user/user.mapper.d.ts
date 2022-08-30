import type { UserDB } from "@prisma/client";
import type { UserDTO } from "../../dto";

export interface UserMapper {
  persistenceToDTO: (user: UserDB) => UserDTO;
}
