import type { Artist } from "@br/core";
import type { ArtistWithTracks } from "../../types";

import trackAdapter from "./trackAdapter";

export default function (artist: ArtistWithTracks, userId?: number): Artist {
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
