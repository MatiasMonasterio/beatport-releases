import type { Track } from "@br/core";
import type { TrackDB, ArtistDB, GenreDB, LabelDB, FavoriteDB } from "@prisma/client";

interface TrackParam extends TrackDB {
  artists: ArtistDB[];
  remixers: ArtistDB[];
  favorite: FavoriteDB[];
  genre: GenreDB | null;
  label: LabelDB | null;
}

export default function (track: TrackParam, userId?: number): Track {
  const artists = track.artists.map((artist) => ({
    id: artist.id,
    name: artist.name,
    slug: artist.name,
  }));

  const remixers = track.remixers.map((remixer) => ({
    id: remixer.id,
    name: remixer.name,
    slug: remixer.name,
  }));

  const emptyGenre: GenreDB = { id: 1, name: "test", slug: "test" };

  const label = track.label
    ? { id: track.label.id, name: track.label.name, slug: track.label.name }
    : { id: 1, name: "test", slug: "test" };

  return {
    id: track.id,
    artists: artists,
    bpm: track.bpm,
    released: new Date(track.released).getTime(),
    genres: track.genre ? [track.genre] : [emptyGenre],
    artwork: track.artwork,
    key: track.key,
    label: label,
    mix: track.mix,
    remixers: remixers,
    name: track.name,
    preview: track.preview,
    favorite: track.favorite.some((favorite) => favorite.userId === userId),
  };
}
