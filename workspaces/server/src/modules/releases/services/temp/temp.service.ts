import type { TempService } from "./temp.service.d";
import type { ArtistId, LabelId } from "../../../../core/domain";

import cache from "../../../../infra/cache";

import { ScraperArtistDTO, ScraperLabelDTO } from "../../../scraper";
import { getExpireTimeToday } from "../../utilities";

const tempService: TempService = {
  saveArtist: async (artist: ScraperArtistDTO): Promise<void> => {
    await cache.set(`artist/${artist.id}`, artist, getExpireTimeToday());
  },

  getArtist: async (artistId: ArtistId): Promise<ScraperArtistDTO | null> => {
    return await cache.getOne(`artist/${artistId}`);
  },

  saveLabel: async (label: ScraperLabelDTO): Promise<void> => {
    await cache.set(`label/${label.id}`, label, getExpireTimeToday());
  },

  getLabel: async (labelId: LabelId): Promise<ScraperLabelDTO | null> => {
    return await cache.getOne(`label/${labelId}`);
  },
};

export default tempService;
