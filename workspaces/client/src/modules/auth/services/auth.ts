import type { AxiosResponse } from "axios";
import type { UserCredentials } from "@br/core";
import type { TokenResponse } from "types";

import { api } from "interceptors";

export const login = async ({ email, password }: UserCredentials): Promise<string> => {
  try {
    const response: AxiosResponse = await api.post("/api/users/login", { email, password });
    const { data: token, error }: TokenResponse = response.data;
    if (error) throw new Error(error);

    return token;
  } catch (error) {
    console.error(error);
    return "";
  }
};

export const loginWithGoogle = () => {
  //
};
