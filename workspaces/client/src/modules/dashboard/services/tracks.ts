import type { Track, ApiParams } from "@br/core";
import type { TracksResponse } from "types";

import { api } from "interceptors";

export const getReleases = async (params?: ApiParams): Promise<Track[]> => {
  const response = await api.get<TracksResponse>("/api/tracks/releases", { params });
  const { data: tracks, error } = response.data;
  if (error) throw new Error(error.message);

  return tracks;
};

export const getUpcomings = async (params?: ApiParams): Promise<Track[]> => {
  const response = await api.get<TracksResponse>("/api/tracks/upcomings", { params });
  const { data: tracks, error } = response.data;
  if (error) throw new Error(error.message);

  return tracks;
};
