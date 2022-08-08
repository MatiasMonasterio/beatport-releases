import type { JwtDecode } from "@br/core";

import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/constants";

export default {
  sign: (payload: JwtDecode) => {
    return jwt.sign(payload, JWT_SECRET);
  },
  verify: (token: string) => {
    return jwt.verify(token, JWT_SECRET) as JwtDecode;
  },
};
