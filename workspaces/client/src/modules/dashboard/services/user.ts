import type { User } from "@br/core";
import type { AxiosResponse } from "axios";
import type { UserResponse } from "types";

import { api } from "interceptors";

export const getUserInfo = async (): Promise<User | null> => {
  const response: AxiosResponse = await api.get("/api/users");
  const { data: user, error }: UserResponse = response.data;
  if (error) throw new Error(error);

  return user;
};
