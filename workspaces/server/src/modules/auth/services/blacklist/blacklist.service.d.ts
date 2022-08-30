import type { Toke, TokenExp } from "../../../../core/domain";

export interface BlacklistService {
  addToken: (token: Toke, expiryTime: TokenExp) => Promise<void>;
  existToken: (token: Toke) => Promise<boolean>;
}
