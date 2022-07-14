import type { User } from "@br/core";
import type { AxiosResponse } from "axios";

import { api } from "interceptors";

export const getUserInfo = async (): Promise<User | null> => {
  try {
    const response: AxiosResponse = await api.get("/api/users");
    const { data: user, error } = response.data;
    if (error) throw new Error(error);

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
