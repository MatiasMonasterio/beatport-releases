import type { UserDB } from "@prisma/client";
import type { UserDTO } from "../../dto";
import type { UserMapper } from "./user.mapper.d";

const userMapper: UserMapper = {
  persistenceToDTO: (user: UserDB): UserDTO => ({
    username: user.username,
    email: user.email,
    name: user.name || "",
    lastname: user.lastname || "",
    avatar: user.avatar || "",
  }),
};

export default userMapper;
