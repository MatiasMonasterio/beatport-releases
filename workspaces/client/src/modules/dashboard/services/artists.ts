import type { Artist, Track, ApiParams } from "@br/core";
import type { AxiosResponse } from "axios";
import type { ArtistResponse, ArtistsResponse, TracksResponse } from "types";

import { api } from "interceptors";

export const getArtists = async (params?: ApiParams): Promise<Artist[]> => {
  const response: AxiosResponse = await api.get("/api/artists", { params });
  const { data: artists, error }: ArtistsResponse = response.data;
  if (error) throw new Error(error);

  return artists;
};

export const addArtistId = async (id: string): Promise<Artist> => {
  const response: AxiosResponse = await api.post("/api/artists", { id });
  const { data: artist, error }: ArtistResponse = response.data;
  if (error) throw new Error(error);

  return artist;
};

export const getArtistById = async (id: string): Promise<Artist> => {
  const response: AxiosResponse = await api.get(`/api/artists/${id}`);
  const { data: artist, error }: ArtistResponse = response.data;
  if (error) throw new Error(error);

  return artist;
};

export const deleteArtistsById = async (id: string): Promise<void> => {
  const response: AxiosResponse = await api.delete(`/api/artists/${id}`);
  const { error }: ArtistResponse = response.data;
  if (error) throw new Error(error);

  return;
};

export const getArtistReleases = async (): Promise<Track[]> => {
  const response: AxiosResponse = await api.get("/api/artists/releases");
  const { data: tracks, error }: TracksResponse = response.data;
  if (error) throw new Error(error);

  return tracks;
};

export const getArtistUpcomings = async (): Promise<Track[]> => {
  const response: AxiosResponse = await api.get("/api/artists/upcomings");
  const { data: tracks, error }: TracksResponse = response.data;
  if (error) throw new Error(error);

  return tracks;
};
