import type { ArtistId, LabelId } from "../../../../core/domain";
import type { ScraperArtistDTO, ScraperLabelDTO } from "../../dto";

export interface ScraperService {
  getOneArtistById: (artistId: ArtistId) => Promise<ScraperArtistDTO>;
  getArtistsByIds: (artistsIds: ArtistId[]) => Promise<ScraperArtistDTO[]>;
  getOneLabelById: (labelId: LabelId) => Promise<ScraperLabelDTO>;
  getLabelsByIds: (labelsIds: LabelId[]) => Promise<ScraperLabelDTO[]>;
}
