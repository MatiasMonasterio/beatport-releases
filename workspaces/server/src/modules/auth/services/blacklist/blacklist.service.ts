import type { Token, TokenExp } from "../../../../core/domain";
import type { BlacklistService } from "./blacklist.service.d";

import cache from "../../../../infra/cache";

const blacklistService: BlacklistService = {
  addToken: async (token: Token, expiryTime: TokenExp): Promise<void> => {
    await cache.set(token, null, expiryTime);
  },

  existToken: async (token: Token): Promise<boolean> => {
    return await cache.exist(token);
  },
};

export default blacklistService;
