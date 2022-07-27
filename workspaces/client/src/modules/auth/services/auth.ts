import type { UserCredentials } from "@br/core";
import type { TokenResponse } from "types";

import { api } from "interceptors";

export const loginWithCredentials = async ({
  email,
  password,
}: UserCredentials): Promise<string> => {
  const response = await api.post<TokenResponse>("/api/users/login", { email, password });
  const { data: token, error } = response.data;
  if (error) throw new Error(error);

  return token;
};

export const register = async ({ email, password }: UserCredentials): Promise<string> => {
  const response = await api.post<TokenResponse>("/api/users/register", { email, password });
  const { data: token, error } = response.data;
  if (error) throw new Error(error);

  return token;
};

export const loginWithGoogle = () => {
  //
};
