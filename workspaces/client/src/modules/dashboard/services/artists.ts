import type { Artist, Track } from "@br/core";
import type { AxiosResponse } from "axios";

import { api } from "interceptors";

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

interface ParamsFilter {
  sort?: keyof Artist;
  order?: "desc" | "asc";
  length?: number;
}

export const getArtists = async (params?: ParamsFilter): Promise<Artist[]> => {
  try {
    const response: AxiosResponse = await api.get("/api/artists", { params });
    const { data: artists, error }: ArtistsResponse = response.data;
    if (error) throw new Error(error);

    return artists;
  } catch (error: unknown) {
    console.error(error);
    return [];
  }
};

export const addArtistId = async (id: string): Promise<Artist | null> => {
  try {
    const response: AxiosResponse = await api.post("/api/artists", { id });
    const { data: artist, error }: ArtistResponse = response.data;
    if (error) throw new Error(error);

    return artist;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getArtistById = async (id: string): Promise<Artist | null> => {
  try {
    const response: AxiosResponse = await api.get(`/api/artists/${id}`);
    const { data: artist, error }: ArtistResponse = response.data;
    if (error) throw new Error(error);

    return artist;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteArtistsById = async (id: string): Promise<void> => {
  try {
    const response: AxiosResponse = await api.delete(`/api/artists/${id}`);
    const { error }: ArtistResponse = response.data;
    if (error) throw new Error(error);

    return;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getArtistReleases = async (): Promise<Track[]> => {
  try {
    const response: AxiosResponse = await api.get("/api/artists/releases");
    const { data: tracks, error }: TracksResponse = response.data;
    if (error) throw new Error(error);

    return tracks;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getArtistUpcomings = async (): Promise<Track[]> => {
  try {
    const response: AxiosResponse = await api.get("/api/artists/upcomings");
    const { data: tracks, error }: TracksResponse = response.data;
    if (error) throw new Error(error);

    return tracks;
  } catch (error) {
    console.error(error);
    return [];
  }
};
