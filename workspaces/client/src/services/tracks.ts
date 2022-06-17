import type { Track } from "@br/core";

const API_URL = import.meta.env.VITE_API_URL;

type TracksResponse = {
  data: Track[];
  error?: string;
};

export const getReleases = async (): Promise<Track[]> => {
  try {
    const resp: Response = await fetch(`${API_URL}/api/tracks/releases`);

    const { data: tracks, error }: TracksResponse = await resp.json();
    if (error) throw new Error(error);

    return tracks;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getUpcomings = async (): Promise<Track[]> => {
  try {
    const resp: Response = await fetch(`${API_URL}/api/tracks/upcomings`);

    const { data: tracks, error }: TracksResponse = await resp.json();
    if (error) throw new Error(error);

    return tracks;
  } catch (error) {
    console.error(error);
    return [];
  }
};
