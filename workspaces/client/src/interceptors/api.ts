import { API_URL } from "config/env";
import axios from "axios";

const beatreleasesApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

beatreleasesApi.interceptors.request.use(
  (request) => {
    if (
      ["auth/login", "auth/register"].some((path) => request.url?.includes(path)) ||
      request.headers?.Authorization
    ) {
      return request;
    }

    const token = localStorage.getItem("auth");

    if (token) {
      request.headers = {
        ...request.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return request;
  },
  (error) => {
    Promise.reject(error);
  }
);

beatreleasesApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // if (error.response.status === 401) {
    //   localStorage.removeItem("auth");
    //   window.location.href = `/auth/login`;
    // }

    return Promise.reject(error.response.data.error);
  }
);

export default beatreleasesApi;
