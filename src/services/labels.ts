import type { Label } from "types";

const API_URL = import.meta.env.VITE_API_URL;

type LabelsResponse = {
  labels: Label[];
  error?: string;
};

type LabelResponse = {
  label: Label;
  error?: string;
};

export const getLabels = async (): Promise<Label[] | null> => {
  try {
    const resp: Response = await fetch(`${API_URL}/api/labels`);
    const { labels, error }: LabelsResponse = await resp.json();

    if (error) throw new Error(error);
    return labels;
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
};

export const addLabelId = async (beatportId: string): Promise<Label | null> => {
  try {
    const resp: Response = await fetch(`${API_URL}/api/labels`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ beatportId }),
    });

    const { label, error }: LabelResponse = await resp.json();
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
    const { label, error }: LabelResponse = await resp.json();
    if (error) throw new Error(error);

    return label;
  } catch (error) {
    console.error(error);
    return null;
  }
};
