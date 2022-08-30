import type { Token, TokenExp } from "../../../../core/domain";
import type { LoginAuthDTO, RegisterAuthDTO } from "../dto";

export interface AuthService {
  login: (creadentials: LoginAuthDTO) => Promise<Token>;
  register: (credentials: RegisterAuthDTO) => Promise<Token>;
  logout: (token: Token, exp: TokenExp) => Promise<void>;
}
