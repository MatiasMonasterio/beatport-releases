import type { AxiosResponse } from "axios";
import { api } from "interceptors";

interface Credentials {
  email: string;
  password: string;
}

interface ResponseJson {
  data: string;
  error?: string;
}

export const login = async ({ email, password }: Credentials): Promise<string> => {
  try {
    const response: AxiosResponse = await api.post("/api/users/login", { email, password });
    const { data: token, error }: ResponseJson = response.data;
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
