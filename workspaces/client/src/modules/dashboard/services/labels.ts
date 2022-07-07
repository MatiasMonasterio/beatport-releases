import type { Label, Track } from "@br/core";
import { API_URL } from "config/env";

type LabelsResponse = {
  data: Label[];
  error?: string;
};

type LabelResponse = {
  data: Label;
  error?: string;
};

type TracksResponse = {
  data: Track[];
  error?: string;
};

interface ParamsFilter {
  sort?: keyof Label;
  order?: "desc" | "asc";
  length?: number;
}

export const getLabels = async (params?: ParamsFilter): Promise<Label[]> => {
  const url = new URL(`${API_URL}/api/labels`);

  if (params) {
    let param: keyof typeof params;

    for (param in params) {
      url.searchParams.append(param, params[param] as string);
    }
  }

  try {
    const resp: Response = await fetch(url.toString());

    const { data: labels, error }: LabelsResponse = await resp.json();
    if (error) throw new Error(error);

    return labels;
  } catch (error: unknown) {
    console.error(error);
    return [];
  }
};

export const addLabelId = async (id: string): Promise<Label | null> => {
  try {
    const resp: Response = await fetch(`${API_URL}/api/labels`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const { data: label, error }: LabelResponse = await resp.json();
    if (error) throw new Error(error);

    return label;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getLabelById = async (id: string): Promise<Label | null> => {
  try {
    const resp: Response = await fetch(`${API_URL}/api/labels/${id}`);

    const { data: label, error }: LabelResponse = await resp.json();
    if (error) throw new Error(error);

    return label;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteLabelById = async (id: string): Promise<void> => {
  try {
    const endpoint = `${API_URL}/api/labels/${id}`;
    const resp: Response = await fetch(endpoint, { method: "DELETE" });

    const { error }: LabelResponse = await resp.json();
    if (error) throw new Error(error);

    return;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getLabelReleases = async (): Promise<Track[]> => {
  try {
    const resp: Response = await fetch(`${API_URL}/api/labels/releases`);

    const { data: tracks, error }: TracksResponse = await resp.json();
    if (error) throw new Error(error);

    return tracks;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getLabelUpcomings = async (): Promise<Track[]> => {
  try {
    const resp: Response = await fetch(`${API_URL}/api/labels/upcomings`);

    const { data: tracks, error }: TracksResponse = await resp.json();
    if (error) throw new Error(error);

    return tracks;
  } catch (error) {
    console.error(error);
    return [];
  }
};
