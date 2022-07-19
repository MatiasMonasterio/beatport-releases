import type { TrackDB, ArtistDB, FavoriteDB, GenreDB, LabelDB, UserDB } from "@prisma/client";

export interface TrackWithProperties extends TrackDB {
  artists: ArtistDB[];
  remixers: ArtistDB[];
  favorite: FavoriteDB[];
  genre: GenreDB | null;
  label: LabelDB | null;
}

interface UserExtented {
  users?: UserDB[];
}

interface TrackExtend {
  track: TrackWithProperties;
}

interface TracksExtended {
  tracks: TrackWithProperties[];
}

export interface ArtistWithTracks extends ArtistDB, UserExtented, TracksExtended {}
export interface LabelWithTracks extends LabelDB, UserExtented, TracksExtended {}
export interface FavoriteExtended extends FavoriteDB, TrackExtend {}
