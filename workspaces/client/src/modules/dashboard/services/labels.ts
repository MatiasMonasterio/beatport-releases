import type { Label, Track, ApiParams } from "@br/core";
import type { AxiosResponse } from "axios";
import type { LabelResponse, LabelsResponse, TracksResponse } from "types";

import { api } from "interceptors";

export const getLabels = async (params?: ApiParams): Promise<Label[]> => {
  const response: AxiosResponse = await api.get("/api/labels", { params });
  const { data: labels, error }: LabelsResponse = response.data;
  if (error) throw new Error(error);

  return labels;
};

export const addLabelId = async (id: string): Promise<Label> => {
  const response: AxiosResponse = await api.post("/api/labels", { id });
  const { data: label, error }: LabelResponse = response.data;
  if (error) throw new Error(error);

  return label;
};

export const getLabelById = async (id: string): Promise<Label> => {
  const response: AxiosResponse = await api.get(`/api/labels/${id}`);
  const { data: label, error }: LabelResponse = response.data;
  if (error) throw new Error(error);

  return label;
};

export const deleteLabelById = async (id: string): Promise<void> => {
  const { error }: LabelResponse = await api.delete(`/api/labels/${id}`);
  if (error) throw new Error(error);

  return;
};

export const getLabelReleases = async (): Promise<Track[]> => {
  const response = await api.get("/api/labels/releases");
  const { data: tracks, error }: TracksResponse = response.data;
  if (error) throw new Error(error);

  return tracks;
};

export const getLabelUpcomings = async (): Promise<Track[]> => {
  const response = await api.get("/api/labels/upcomings");
  const { data: tracks, error }: TracksResponse = response.data;
  if (error) throw new Error(error);

  return tracks;
};
