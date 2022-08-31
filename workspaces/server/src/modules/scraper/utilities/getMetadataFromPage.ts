import type { BeatportScraperDTO } from "../dto";
import * as cheerio from "cheerio";

const findTextAndReturnRemainder = (target: string, variable: string): string => {
  const chopFront = target.substring(target.search(variable) + variable.length, target.length);
  const result = chopFront.substring(0, chopFront.search(";"));
  return result;
};

export default function getMetadataFromPage(page: string): BeatportScraperDTO {
  const $ = cheerio.load(page);

  const artwork = $("#pjax-target img").attr("src") || "";
  const { data: name } = $(".interior-title h1").get()[0].children[0] as { data: string };

  const { data: scriptData } = $("script#data-objects").get()[0].children[0] as { data: string };
  const findAndClear = findTextAndReturnRemainder(scriptData, "window.Playables =");

  const { tracks } = JSON.parse(findAndClear);

  return {
    name,
    artwork,
    tracks,
  };
}
