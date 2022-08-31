import { TrackDB, ArtistDB, LabelDB, FavoriteDB, GenreDB } from "@prisma/client";

export interface TrackRepo extends TrackDB {
  artists: ArtistDB[];
  label: LabelDB | null;
  remixers: ArtistDB[];
  favorite: FavoriteDB[];
  genre: GenreDB | null;
}
