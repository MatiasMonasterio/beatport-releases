import { api } from "interceptors";

export const generateData = async (): Promise<void> => {
  const response = await api.get("/api/seed");
  const { error } = response.data;
  if (error) throw new Error(error);

  return;
};
