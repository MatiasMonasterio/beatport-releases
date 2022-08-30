import type { UserId } from "../../../../core/domain";
import type { ScraperTrackDTO } from "../../../scraper";
import type { TrackDTO } from "../../dto";
import type { TrackRepo } from "../../interfaces";

export interface TrackMapper {
  persistanceToDTO: (track: TrackRepo, userId: UserId) => TrackDTO;
  scraperToDTO: (track: ScraperTrackDTO) => TrackDTO;
}
