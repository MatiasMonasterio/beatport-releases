import type { Track } from "@br/core";

const API_URL = import.meta.env.VITE_API_URL;

type TracksResponse = {
  data: Track[];
  error?: string;
};

export const getFavorites = async (): Promise<Track[]> => {
  try {
    const resp: Response = await fetch(`${API_URL}/api/favorites`);
    const { data: tracks, error }: TracksResponse = await resp.json();
    if (error) throw new Error(error);

    return tracks;
  } catch (error: unknown) {
    console.error(error);
    return [];
  }
};

export const newFavoriteTrack = async (track: Track): Promise<void> => {
  try {
    const resp: Response = await fetch(`${API_URL}/api/favorites`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(track),
    });

    const { error }: TracksResponse = await resp.json();
    if (error) throw new Error(error);
  } catch (error) {
    console.error(error);
  }
};

export const deleteFavoriteById = async (id: number): Promise<void> => {
  try {
    const endpoint = `${API_URL}/api/favorites/${id}`;
    const resp: Response = await fetch(endpoint, { method: "DELETE" });

    const { error }: TracksResponse = await resp.json();
    if (error) throw new Error(error);

    return;
  } catch (error) {
    console.error(error);
    return;
  }
};
