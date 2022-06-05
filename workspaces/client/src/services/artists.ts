import type { Artist, Track } from "@br/core";

const API_URL = import.meta.env.VITE_API_URL;

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

export const getArtists = async (): Promise<Artist[]> => {
  try {
    const resp: Response = await fetch(`${API_URL}/api/artists`);

    const { data: artists, error }: ArtistsResponse = await resp.json();
    if (error) throw new Error(error);

    return artists;
  } catch (error: unknown) {
    console.error(error);
    return [];
  }
};

export const addArtistId = async (beatportId: string): Promise<Artist | null> => {
  try {
    const resp: Response = await fetch(`${API_URL}/api/artists`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ beatportId }),
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
