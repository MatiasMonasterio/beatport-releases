import type { Artist } from "types";

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
