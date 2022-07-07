import type { Artist, Track } from "@br/core";
import { API_URL } from "config/env";

type ArtistsResponse = {
  data: Artist[];
  error?: string;
};

type ArtistResponse = {
  data: Artist;
  error?: string;
};

type TracksResponse = {
  data: Track[];
  error?: string;
};

interface ParamsFilter {
  sort?: keyof Artist;
  order?: "desc" | "asc";
  length?: number;
}

export const getArtists = async (params?: ParamsFilter): Promise<Artist[]> => {
  const url = new URL(`${API_URL}/api/artists`);

  if (params) {
    let param: keyof typeof params;

    for (param in params) {
      url.searchParams.append(param, params[param] as string);
    }
  }

  try {
    const resp: Response = await fetch(url.toString());

    const { data: artists, error }: ArtistsResponse = await resp.json();
    if (error) throw new Error(error);

    return artists;
  } catch (error: unknown) {
    console.error(error);
    return [];
  }
};

export const addArtistId = async (id: string): Promise<Artist | null> => {
  try {
    const resp: Response = await fetch(`${API_URL}/api/artists`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const { data: artist, error }: ArtistResponse = await resp.json();
    if (error) throw new Error(error);

    return artist;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getArtistById = async (id: string): Promise<Artist | null> => {
  try {
    const resp: Response = await fetch(`${API_URL}/api/artists/${id}`);

    const { data: artist, error }: ArtistResponse = await resp.json();
    if (error) throw new Error(error);

    return artist;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteArtistsById = async (id: string): Promise<void> => {
  try {
    const endpoint = `${API_URL}/api/artists/${id}`;
    const resp: Response = await fetch(endpoint, { method: "DELETE" });

    const { error }: ArtistResponse = await resp.json();
    if (error) throw new Error(error);

    return;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getArtistReleases = async (): Promise<Track[]> => {
  try {
    const resp: Response = await fetch(`${API_URL}/api/artists/releases`);

    const { data: tracks, error }: TracksResponse = await resp.json();
    if (error) throw new Error(error);

    return tracks;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getArtistUpcomings = async (): Promise<Track[]> => {
  try {
    const resp: Response = await fetch(`${API_URL}/api/artists/upcomings`);

    const { data: tracks, error }: TracksResponse = await resp.json();
    if (error) throw new Error(error);

    return tracks;
  } catch (error) {
    console.error(error);
    return [];
  }
};
