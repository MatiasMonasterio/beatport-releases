import type { Favorite } from "@br/core";
import type { FavoriteDB, TrackDB, ArtistDB, GenreDB, LabelDB } from "@prisma/client";

import trackAdapter from "./trackAdapter";

interface TrackParam extends TrackDB {
  artists: ArtistDB[];
  remixers: ArtistDB[];
  favorite: FavoriteDB[];
  genre: GenreDB | null;
  label: LabelDB | null;
}

interface FavoriteExtended extends FavoriteDB {
  track: TrackParam;
}

export default function favoriteAdapter(favorite: FavoriteExtended, userId: number): Favorite {
  return {
    ...trackAdapter(favorite.track, userId),
    createdAt: new Date(favorite.createdAt).getTime(),
  };
}
