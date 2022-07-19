import type { User, UserCredentials, JwtDecode } from "@br/core";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { JWT_SECRET } from "../../config/constants";
import db from "../../database";

import { userAdapters } from "../adapters";

const SALT_ROUNDS = 10;

const createNewUser = async ({ email, password }: UserCredentials): Promise<string> => {
  const username = email;
  password = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await db.userDB.findUnique({ where: { email: email } });
  if (user && user.active) throw { status: 409, message: "User already exist" };

  if (user && !user.active) {
    const activeUser = await db.userDB.update({
      where: { email: email },
      data: { password, active: true },
    });

    return jwt.sign({ id: activeUser.id, name: activeUser.name }, JWT_SECRET);
  }

  const newUser = await db.userDB.create({ data: { email, password, username, active: true } });

  const jwtValue: JwtDecode = {
    id: newUser.id,
    username: newUser.username,
    avatar: newUser.avatar || "",
  };

  return jwt.sign(jwtValue, JWT_SECRET);
};

const loginUser = async ({ email, password }: UserCredentials): Promise<string> => {
  const user = await db.userDB.findUnique({ where: { email: email } });
  if (!user || !user.active) throw { status: 401, message: "invalid email or password" };

  const hashPass = /^\$2y\$/.test(user.password) ? "$2a$" + user.password.slice(4) : user.password;
  const passwordCorrenct = await bcrypt.compare(password, hashPass);

  if (!passwordCorrenct) {
    throw { status: 401, message: "invalid user invalid email or password" };
  }

  const jwtValue: JwtDecode = {
    id: user.id,
    username: user.username,
    avatar: user.avatar || "",
  };

  return jwt.sign(jwtValue, JWT_SECRET);
};

const deleOneUser = async (id: number) => {
  await db.userDB.update({ where: { id: id }, data: { active: false } });
};

const getUser = async (id: number): Promise<User> => {
  const user = await db.userDB.findUnique({ where: { id: id } });
  if (!user) throw { status: 404, message: "User not found" };

  return userAdapters(user);
};

export default {
  createNewUser,
  loginUser,
  getUser,
  deleOneUser,
};
