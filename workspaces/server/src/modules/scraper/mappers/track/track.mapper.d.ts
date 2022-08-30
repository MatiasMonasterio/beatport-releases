import type { BeatportTrackDTO, ScraperTrackDTO } from "../../dto";

export interface TrackMapper {
  beatportToScraper: (track: BeatportTrackDTO) => ScraperTrackDTO;
}
