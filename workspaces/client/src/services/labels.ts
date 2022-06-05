import type { Label, Track } from "@br/core";

const API_URL = import.meta.env.VITE_API_URL;

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

export const getLabels = async (): Promise<Label[] | null> => {
  try {
    const resp: Response = await fetch(`${API_URL}/api/labels`);

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
