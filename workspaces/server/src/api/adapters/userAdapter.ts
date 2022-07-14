import type { User } from "@br/core";
import type { UserDB } from "@prisma/client";

export default function (user: UserDB): User {
  return {
    username: user.username,
    email: user.email,
    password: user.password,
    name: user.name || "",
    lastname: user.lastname || "",
    genre: user.genre || "",
    avatar: user.avatar || "",
    createdAt: user.createdAt,
  };
}
