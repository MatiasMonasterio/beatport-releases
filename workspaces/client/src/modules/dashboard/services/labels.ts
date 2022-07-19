import type { Label, Track, ApiParams } from "@br/core";
import type { AxiosResponse } from "axios";
import type { LabelResponse, LabelsResponse, TracksResponse } from "types";

import { api } from "interceptors";

export const getLabels = async (params?: ApiParams): Promise<Label[]> => {
  try {
    const response: AxiosResponse = await api.get("/api/labels", { params });
    const { data: labels, error }: LabelsResponse = response.data;
    if (error) throw new Error(error);

    return labels;
  } catch (error: unknown) {
    console.error(error);
    return [];
  }
};

export const addLabelId = async (id: string): Promise<Label | null> => {
  try {
    const response: AxiosResponse = await api.post("/api/labels", { id });
    const { data: label, error }: LabelResponse = response.data;
    if (error) throw new Error(error);

    return label;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getLabelById = async (id: string): Promise<Label | null> => {
  try {
    const response: AxiosResponse = await api.get(`/api/labels/${id}`);
    const { data: label, error }: LabelResponse = response.data;
    if (error) throw new Error(error);

    return label;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteLabelById = async (id: string): Promise<void> => {
  try {
    const { error }: LabelResponse = await api.delete(`/api/labels/${id}`);
    if (error) throw new Error(error);

    return;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getLabelReleases = async (): Promise<Track[]> => {
  try {
    const response = await api.get("/api/labels/releases");
    const { data: tracks, error }: TracksResponse = response.data;
    if (error) throw new Error(error);

    return tracks;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getLabelUpcomings = async (): Promise<Track[]> => {
  try {
    const response = await api.get("/api/labels/upcomings");
    const { data: tracks, error }: TracksResponse = response.data;
    if (error) throw new Error(error);

    return tracks;
  } catch (error) {
    console.error(error);
    return [];
  }
};
