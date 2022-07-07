import { API_URL } from "config/env";

interface getYoutubeVideoIdResponse {
  id: string;
  error: string;
}

export const getYoutubeVideoId = async (query: string): Promise<string | null> => {
  try {
    const resp: Response = await fetch(`${API_URL}/api/releases/youtube?q=${query}`);
    const { id, error }: getYoutubeVideoIdResponse = await resp.json();

    if (error) throw new Error(error);
    return id;
  } catch (error) {
    console.error(error);
    return null;
  }
};
