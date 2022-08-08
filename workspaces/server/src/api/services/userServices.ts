import type { User, UserCredentials } from "@br/core";

import jwt from "../../utils/jwt";
import bcrypt from "../../utils/bcrypt";

import { userAdapters } from "../adapters";
import { userDAL } from "../data-access-layer";

const createNewUser = async ({ email, password }: UserCredentials): Promise<string> => {
  const username = email;
  password = await bcrypt.hash(password);

  const user = await userDAL.getByEmail(email);
  if (user && user.active) throw { status: 409, message: "User already exist" };

  if (user && !user.active) {
    const activeUser = await userDAL.active(email, password);

    return jwt.sign({
      id: activeUser.id,
      username: activeUser.username,
      avatar: activeUser.avatar || "",
    });
  }

  const newUser = await userDAL.create(email, password, username);

  return jwt.sign({
    id: newUser.id,
    username: newUser.username,
    avatar: newUser.avatar || "",
  });
};

const loginUser = async ({ email, password }: UserCredentials): Promise<string> => {
  const user = await userDAL.getByEmail(email);
  if (!user || !user.active) throw { status: 401, message: "invalid email or password" };

  const passwordCorrenct = await bcrypt.compare(password, user.password);
  if (!passwordCorrenct) throw { status: 401, message: "invalid user invalid email or password" };

  return jwt.sign({
    id: user.id,
    username: user.username,
    avatar: user.avatar || "",
  });
};

const deleOneUser = async (id: number) => {
  await userDAL.disableUserById(id);
};

const getUser = async (id: number): Promise<User> => {
  const user = await userDAL.getById(id);
  if (!user || !user.active) throw { status: 404, message: "User not found" };

  return userAdapters(user);
};

export default {
  createNewUser,
  loginUser,
  getUser,
  deleOneUser,
};
