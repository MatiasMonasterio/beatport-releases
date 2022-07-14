import type { Track } from "@br/core";
import type { AxiosResponse } from "axios";

import { api } from "interceptors";

type TracksResponse = {
  data: Track[];
  error?: string;
};

export const getReleases = async (): Promise<Track[]> => {
  try {
    const response: AxiosResponse = await api.get("/api/tracks/releases");
    const { data: tracks, error }: TracksResponse = response.data;
    if (error) throw new Error(error);

    return tracks;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getUpcomings = async (): Promise<Track[]> => {
  try {
    const response: AxiosResponse = await api.get("/api/tracks/upcomings");
    const { data: tracks, error }: TracksResponse = response.data;
    if (error) throw new Error(error);

    return tracks;
  } catch (error) {
    console.error(error);
    return [];
  }
};
