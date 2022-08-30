import type { AuthService } from "./auth.services.d";
import type { Token, TokenExp } from "../../../../core/domain";

import { HttpException } from "../../../../core";
import { bcrypt } from "../../../../utilities";

import { LoginDTO, RegisterDTO } from "../../dto";
import { authRepository } from "../../repositories";
import { blacklistService } from "../../services";
import { jwt } from "../../utilities";

const authService: AuthService = {
  login: async (credentials: LoginDTO): Promise<Token> => {
    const { email, password } = credentials;

    const user = await authRepository.getUserByEmail(email);
    if (!user) throw new HttpException(401, "Invalid email or password");

    const passwordCorrenct = await bcrypt.compare(password, user.password);
    if (!passwordCorrenct) throw new HttpException(401, "Invalid email or password");

    return jwt.signUser(user);
  },

  register: async (credentials: RegisterDTO): Promise<Token> => {
    const user = await authRepository.getUserByEmail(credentials.email);
    if (user && user.active) throw new HttpException(409, "Email already exist");

    if (user && !user.active) {
      await authRepository.activeUserById(user.id);
      return jwt.signUser(user);
    }

    const newUser = await authRepository.createUser(credentials);
    return jwt.signUser(newUser);
  },

  logout: async (token: Token, exp: TokenExp): Promise<void> => {
    await blacklistService.addToken(token, exp);
  },
};

export default authService;
