import type { Artist, Track } from "types";

const API_URL = import.meta.env.VITE_API_URL;

type ArtistsResponse = {
  artists: Artist[];
  error?: string;
};

type ArtistResponse = {
  artist: Artist;
  error?: string;
};

export const getArtists = async (): Promise<Artist[] | null> => {
  try {
    const resp: Response = await fetch(`${API_URL}/api/artists`);
    const { artists, error }: ArtistsResponse = await resp.json();

    if (error) throw new Error(error);
    return artists;
  } catch (error: unknown) {
    console.error(error);
    return null;
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

    const { artist, error }: ArtistResponse = await resp.json();
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
    const { artist, error }: ArtistResponse = await resp.json();
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
    await resp.json();

    return;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getArtistReleases = async (): Promise<Track[] | null> => {
  try {
    const resp = await fetch(`${API_URL}/api/artists/releases`);
    const { releases }: { releases: Track[] } = await resp.json();

    return releases;
  } catch (error) {
    console.error(error);
    return null;
  }
};
