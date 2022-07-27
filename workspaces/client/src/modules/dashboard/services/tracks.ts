import type { Track } from "@br/core";
import type { AxiosResponse } from "axios";
import type { TracksResponse } from "types";

import { api } from "interceptors";

export const getReleases = async (): Promise<Track[]> => {
  const response: AxiosResponse = await api.get("/api/tracks/releases");
  const { data: tracks, error }: TracksResponse = response.data;
  if (error) throw new Error(error);

  return tracks;
};

export const getUpcomings = async (): Promise<Track[]> => {
  const response: AxiosResponse = await api.get("/api/tracks/upcomings");
  const { data: tracks, error }: TracksResponse = response.data;
  if (error) throw new Error(error);

  return tracks;
};
