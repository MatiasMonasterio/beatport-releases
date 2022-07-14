import type { Label } from "@br/core";
import type { LabelDB, ArtistDB, GenreDB, TrackDB, FavoriteDB, UserDB } from "@prisma/client";

import trackAdapter from "./trackAdapter";

interface TracksExtended extends TrackDB {
  artists: ArtistDB[];
  remixers: ArtistDB[];
  favorite: FavoriteDB[];
  genre: GenreDB | null;
  label: LabelDB | null;
}

interface LabelAndTracks extends LabelDB {
  tracks: TracksExtended[];
  users?: UserDB[];
}

export default function labelAdapter(label: LabelAndTracks, userId?: number): Label {
  const tracks = label.tracks.map((track) => trackAdapter(track, userId));

  return {
    id: label.id,
    name: label.name,
    artwork: label.artwork || "",
    tracks: tracks,
    profile: label.profile,
    follow: label.users?.some((user) => user.id === userId),
  };
}
