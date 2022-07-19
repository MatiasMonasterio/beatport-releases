import type { Track } from "@br/core";
import type { AxiosResponse } from "axios";
import type { TracksResponse } from "types";

import { api } from "interceptors";

export const getFavorites = async (): Promise<Track[]> => {
  try {
    const response: AxiosResponse = await api.get("/api/favorites");
    const { data: tracks, error }: TracksResponse = response.data;
    if (error) throw new Error(error);

    return tracks;
  } catch (error: unknown) {
    console.error(error);
    return [];
  }
};

export const newFavoriteTrack = async (track: Track): Promise<void> => {
  try {
    const response: AxiosResponse = await api.post("/api/favorites", track);
    const { error }: TracksResponse = response.data;

    if (error) throw new Error(error);
  } catch (error) {
    console.error(error);
  }
};

export const deleteFavoriteById = async (id: number): Promise<void> => {
  try {
    const response: AxiosResponse = await api.delete(`/api/favorites/${id}`);
    const { error }: TracksResponse = response.data;
    if (error) throw new Error(error);

    return;
  } catch (error) {
    console.error(error);
    return;
  }
};
