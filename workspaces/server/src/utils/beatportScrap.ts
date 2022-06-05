import type { Artist, Label, Track } from "@br/core";
import type { TrackResponse } from "../types";

import dayjs from "dayjs";
import axios from "axios";
import * as cheerio from "cheerio";

const BEATPORT_BASE_URL = "https://www.beatport.com";

const findTextAndReturnRemainder = (target: string, variable: string): string => {
  const chopFront = target.substring(target.search(variable) + variable.length, target.length);
  const result = chopFront.substring(0, chopFront.search(";"));
  return result;
};

const artistsScrapper = async (artistsId: number[]): Promise<Artist[]> => {
  const artists = await Promise.all(
    artistsId.map(async (artistId) => {
      const endDate = dayjs(new Date()).add(60, "day").format("YYYY-MM-DD");
      const startDate = dayjs(new Date()).subtract(30, "day").format("YYYY-MM-DD");

      const artistProfile = `${BEATPORT_BASE_URL}/artist/a/${artistId}`;
      const artistReleasesPage = `${artistProfile}/tracks?start-date=${startDate}&end-date=${endDate}`;

      const { data }: { data: string } = await axios.get(artistReleasesPage);
      const $ = cheerio.load(data);

      const artworkSrc = $("img.interior-artist-artwork-background").attr("src") || "";
      const artistName = $(".interior-title h1").get()[0].children[0] as { data: string };

      const scriptData = $("script#data-objects").get()[0].children[0] as { data: string };
      const findAndClear = findTextAndReturnRemainder(scriptData.data, "window.Playables =");

      const { tracks: tracksResp }: { tracks: TrackResponse[] } = JSON.parse(findAndClear);

      const tracks: Track[] = tracksResp.map((track) => ({
        id: track.id,
        artists: track.artists,
        bpm: track.bpm,
        released: new Date(track.date.released).getTime(),
        genres: track.genres,
        artwork: track.images.small.url.replace("1400x1400", "100x100"),
        key: track.key,
        label: track.label,
        mix: track.mix,
        remixers: track.remixers,
        name: track.name,
        preview: track.preview.mp3.url,
      }));

      return {
        id: artistId,
        name: artistName.data,
        artwork: artworkSrc,
        tracksCount: tracks.length,
        profile: artistProfile,
        tracks: tracks,
      };
    })
  );

  return artists.sort((a, b) => a.name.localeCompare(b.name));
};

const labelsScrapper = async (labelsId: number[]): Promise<Label[]> => {
  const labels = await Promise.all(
    labelsId.map(async (id) => {
      const endDate = dayjs(new Date()).add(60, "day").format("YYYY-MM-DD");
      const startDate = dayjs(new Date()).subtract(30, "day").format("YYYY-MM-DD");

      const labelProfile = `${BEATPORT_BASE_URL}/label/l/${id}`;
      const labelReleasesPage = `${labelProfile}/tracks?start-date=${startDate}&end-date=${endDate}`;

      const { data }: { data: string } = await axios.get(labelReleasesPage);
      const $ = cheerio.load(data);

      const artwork = $("img.interior-top-artwork").attr("src") || "";
      const labelName = $(".interior-title h1").get()[0].children[0] as { data: string };

      const scriptData = $("script#data-objects").get()[0].children[0] as { data: string };
      const findAndClear = findTextAndReturnRemainder(scriptData.data, "window.Playables =");

      const { tracks: tracksResp }: { tracks: TrackResponse[] } = JSON.parse(findAndClear);

      const tracks: Track[] = tracksResp.map((track) => ({
        id: track.id,
        artists: track.artists,
        bpm: track.bpm,
        released: new Date(track.date.released).getTime(),
        genres: track.genres,
        artwork: track.images.small.url.replace("1400x1400", "100x100"),
        key: track.key,
        label: track.label,
        mix: track.mix,
        remixers: track.remixers,
        name: track.name,
        preview: track.preview.mp3.url,
      }));

      return {
        name: labelName.data,
        id: id,
        profile: labelProfile,
        artwork,
        tracks,
      };
    })
  );

  return labels.sort((a, b) => a.name.localeCompare(b.name));
};

export default {
  artists: artistsScrapper,
  labels: labelsScrapper,
};
