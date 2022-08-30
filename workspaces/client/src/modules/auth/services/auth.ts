import type { UserCredentials } from "@br/core";
import type { TokenResponse } from "types";

import { api } from "interceptors";

export const loginWithCredentials = async ({
  email,
  password,
}: UserCredentials): Promise<string> => {
  const response = await api.post<TokenResponse>("/api/auth/login", { email, password });
  const { data: token, error } = response.data;
  if (error) throw new Error(error.message);

  return token;
};

export const register = async ({ email, password }: UserCredentials): Promise<string> => {
  const response = await api.post<TokenResponse>("/api/auth/register", { email, password });
  const { data: token, error } = response.data;
  if (error) throw new Error(error.message);

  return token;
};

export const logout = async (): Promise<void> => {
  const response = await api.post("/api/auth/logout");
  const { error } = response.data;
  if (error) throw new Error(error.message);
};

export const loginWithGoogle = () => {
  //
};
