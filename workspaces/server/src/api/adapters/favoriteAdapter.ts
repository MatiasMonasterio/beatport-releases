import type { Favorite } from "@br/core";
import type { FavoriteExtended } from "../../types";

import trackAdapter from "./trackAdapter";

export default function favoriteAdapter(favorite: FavoriteExtended, userId: number): Favorite {
  return {
    ...trackAdapter(favorite.track, userId),
    createdAt: new Date(favorite.createdAt).getTime(),
  };
}
