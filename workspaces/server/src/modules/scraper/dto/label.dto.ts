import type { LabelId, LabelName, LabelArtwork } from "../../../core/domain";
import type { ScraperTrackDTO } from "./tracks.dto";

export interface ScraperLabelDTO {
  id: LabelId;
  name: LabelName;
  artwork: LabelArtwork;
  tracks: ScraperTrackDTO[];
}
