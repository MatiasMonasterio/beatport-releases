import type { UserId } from "../../../../core/domain";
import type { ScraperLabelDTO } from "../../../scraper";
import type { LabelRepo } from "../../interfaces";
import type { LabelDTO } from "../../dto";

export interface LabelMapper {
  persistenceToDTO: (label: LabelRepo, userId: UserId) => LabelDTO;
  scraperToDTO: (label: ScraperLabelDTO) => LabelDTO;
}
