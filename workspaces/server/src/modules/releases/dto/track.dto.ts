import type {
  TrackId,
  TrackBpm,
  TrackArtwork,
  TrackKey,
  TrackMix,
  TrackName,
  TrackPreview,
  // TrackReleased,
  TrackFavorite,
} from "../../../core/domain";

interface Artist {
  id: number;
  name: string;
}

interface Genre {
  id: number;
  name: string;
}

interface Label {
  id: number;
  name: string;
}

export interface TrackDTO {
  id: TrackId;
  artists: Artist[];
  bpm: TrackBpm;
  // todo: check parse number to date
  released: Date;
  genre: Genre | null;
  artwork: TrackArtwork;
  key: TrackKey;
  label: Label | null;
  mix: TrackMix;
  remixers: Artist[];
  name: TrackName;
  preview: TrackPreview;
  favorite: TrackFavorite;
}
