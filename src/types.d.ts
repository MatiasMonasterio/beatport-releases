export interface Artist {
  id: number;
  name: string;
  artwork: string;
  tracksCount: number;
  tracks: Track[];
  profile?: string;
}

export interface Track {
  artists: Array<{ id: number; name: string; slug: string }>;
  bpm: number;
  released: number;
  genres: Array<{ id: number; name: string; slug: string }>;
  artwork: string;
  key: string;
  label: { id: number; name: string; slug: string };
  mix: string;
  remixers: Array<{ id: number; name: string; slug: string }>;
  name: string;
  preview: string;
}
