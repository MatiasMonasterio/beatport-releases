import type { ScraperArtistDTO, ScraperLabelDTO } from "../../../scraper";
import type { ArtistId, LabelId } from "../../../../core/domain";

export interface TempService {
  saveArtist: (artist: ScraperArtistDTO) => Promise<void>;
  getArtist: (artistId: ArtistId) => Promise<ScraperArtistDTO | null>;
  saveLabel: (label: ScraperLabelDTO) => Promise<void>;
  getLabel: (labelId: LabelId) => Promise<ScraperLabelDTO | null>;
}
