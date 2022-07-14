import type { Artist } from "@br/core";
import type { ArtistDB, TrackDB, GenreDB, LabelDB, FavoriteDB, UserDB } from "@prisma/client";

import trackAdapter from "./trackAdapter";

interface TracksExtended extends TrackDB {
  artists: ArtistDB[];
  remixers: ArtistDB[];
  favorite: FavoriteDB[];
  genre: GenreDB | null;
  label: LabelDB | null;
}

interface ArtistAndTracks extends ArtistDB {
  tracks: TracksExtended[];
  users?: UserDB[];
}

export default function (artist: ArtistAndTracks, userId?: number): Artist {
  const tracks = artist.tracks.map((track) => trackAdapter(track, userId));

  return {
    id: artist.id,
    name: artist.name,
    artwork: artist.artwork || "",
    tracks: tracks,
    tracksCount: tracks.length,
    profile: artist.profile,
    createdAt: new Date(artist.createdAt).getTime(),
    follow: artist.users?.some((user) => user.id == userId),
  };
}
