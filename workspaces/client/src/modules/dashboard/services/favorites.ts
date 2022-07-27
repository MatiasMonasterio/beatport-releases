import type { Track } from "@br/core";
import type { AxiosResponse } from "axios";
import type { TracksResponse } from "types";

import { api } from "interceptors";

export const getFavorites = async (): Promise<Track[]> => {
  const response: AxiosResponse = await api.get("/api/favorites");
  const { data: tracks, error }: TracksResponse = response.data;
  if (error) throw new Error(error);

  return tracks;
};

export const newFavoriteTrack = async (track: Track): Promise<void> => {
  const response: AxiosResponse = await api.post("/api/favorites", track);
  const { error }: TracksResponse = response.data;

  if (error) throw new Error(error);
};

export const deleteFavoriteById = async (id: number): Promise<void> => {
  const response: AxiosResponse = await api.delete(`/api/favorites/${id}`);
  const { error }: TracksResponse = response.data;
  if (error) throw new Error(error);

  return;
};
