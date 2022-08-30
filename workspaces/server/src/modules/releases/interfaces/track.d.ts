import { TrackDB } from "@prisma/client";

export interface TrackRepo extends TrackDB {
  artists: ArtistDB[];
  label: LabelDB | null;
  remixers: ArtistDB[];
  favorite: FavoriteDB[];
  genre: GenreDB | null;
  users?: UserDB[];
}
