import type { UserId } from "../../../../core/domain";
import type { ScraperLabelDTO } from "../../../scraper";
import type { LabelRepo } from "../../interfaces";
import type { LabelDTO } from "../../dto";
import type { LabelMapper } from "./label.mapper.d";

const BASE_LABEL_PROFILE_URL = "https://www.beatport.com/label/l/";

const labelMapper: LabelMapper = {
  persistenceToDTO: (label: LabelRepo, userId: UserId): LabelDTO => ({
    id: label.id,
    name: label.name,
    tracksCount: label._count.tracks,
    profile: `${BASE_LABEL_PROFILE_URL}/${label.id}`,
    artwork: label.artwork || "",
    follow: label.users.some((user) => user.id === userId),
  }),

  scraperToDTO: (label: ScraperLabelDTO): LabelDTO => ({
    id: label.id,
    name: label.name,
    tracksCount: label.tracks.length,
    profile: `${BASE_LABEL_PROFILE_URL}/${label.id}`,
    artwork: label.artwork,
    follow: false,
  }),
};

export default labelMapper;
