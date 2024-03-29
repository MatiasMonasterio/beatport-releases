export interface ApiParams {
  sort?: keyof Artist | keyof Track;
  order?: "desc" | "asc";
  length?: number;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface JwtDecode {
  id: number;
  username: string;
  avatar: string;
  exp: number;
}

export interface User {
  username: string;
  email: string;
  password: string;
  name: string;
  lastname: string;
  avatar: string;
  createdAt: Date;
}

export interface Artist {
  id: number;
  name: string;
  artwork: string;
  tracksCount: number;
  profile?: string;
  follow?: boolean;
  createdAt?: number;
  updatedAt?: number;
}

export interface Label {
  id: number;
  name: string;
  artwork: string;
  tracksCount: number;
  profile?: string;
  follow?: boolean;
  createdAt?: number;
  updatedAt?: number;
}

export interface Track {
  id: number;
  artists: Array<{ id: number; name: string; slug: string }>;
  bpm: number;
  released: number;
  genre: { id: number; name: string; slug: string };
  artwork: string;
  key: string | number;
  label: { id: number; name: string; slug: string };
  mix: string;
  remixers: Array<{ id: number; name: string; slug: string }>;
  name: string;
  preview: string;
  favorite?: boolean;
}

export interface Favorite extends Track {
  createdAt?: number;
}

export interface FavoriteTrack {
  id: number;
  artists: string;
  bpm: number;
  released: number;
  genres: string;
  artwork: string;
  key: string | number;
  label: string;
  mix: string;
  remixers: string;
  name: string;
  preview: string;
  favorite?: boolean;
  createdAt?: number;
  updatedAt?: number;
}
