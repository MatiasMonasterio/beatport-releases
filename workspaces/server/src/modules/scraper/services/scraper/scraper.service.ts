import type { ArtistId, LabelId } from "../../../../core/domain";
import type { ScraperService } from "./scraper.service.d";

import axios from "axios";

import { ScraperArtistDTO, ScraperLabelDTO } from "../../dto";
import { trackMapper } from "../../mappers";
import { getMetadataFromPage, getBeatportTrackPage } from "../../utilities";

const scraperService: ScraperService = {
  getOneArtistById: async (artistId: ArtistId): Promise<ScraperArtistDTO> => {
    const artistReleasesPage = getBeatportTrackPage.artist(artistId);

    const { data } = await axios.get<string>(artistReleasesPage);
    const { name, artwork, tracks } = getMetadataFromPage(data);

    return {
      id: artistId,
      name: name,
      artwork: artwork,
      tracks: tracks.map((track) => trackMapper.beatportToScraper(track)),
    };
  },

  getArtistsByIds: async (artistsIds: ArtistId[]): Promise<ScraperArtistDTO[]> => {
    return await Promise.all(
      artistsIds.map(async (artistId) => await scraperService.getOneArtistById(artistId))
    );
  },

  getOneLabelById: async (labelId: LabelId): Promise<ScraperLabelDTO> => {
    const labelReleasesPage = getBeatportTrackPage.label(labelId);

    const { data } = await axios.get<string>(labelReleasesPage);
    const { name, artwork, tracks } = getMetadataFromPage(data);

    return {
      id: labelId,
      name: name,
      artwork: artwork,
      tracks: tracks.map((track) => trackMapper.beatportToScraper(track)),
    };
  },

  getLabelsByIds: async (labelsIds: LabelId[]): Promise<ScraperLabelDTO[]> => {
    return await Promise.all(
      labelsIds.map(async (labelId) => await scraperService.getOneLabelById(labelId))
    );
  },
};

export default scraperService;
