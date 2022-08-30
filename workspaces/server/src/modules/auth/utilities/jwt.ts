import type { JwtDecode } from "@br/core";
import type { UserDB } from "@prisma/client";
import type { Token } from "../../../core/domain";

import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET } from "../../../config/env";

interface Jwt {
  sign: (payload: JwtDecode) => Token;
  signUser: (user: UserDB) => Token;
  verify: (token: Token) => JwtDecode;
}

const jwt: Jwt = {
  sign: (payload: JwtDecode): Token => {
    return jsonwebtoken.sign(payload, JWT_SECRET);
  },

  signUser: (user: UserDB): Token => {
    const { id, username, avatar } = user;
    return jsonwebtoken.sign({ id, username, avatar }, JWT_SECRET);
  },

  verify: (token: string): JwtDecode => {
    return jsonwebtoken.verify(token, JWT_SECRET) as JwtDecode;
  },
};

export default jwt;
