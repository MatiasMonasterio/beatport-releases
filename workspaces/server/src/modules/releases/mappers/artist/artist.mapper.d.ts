import type { UserId } from "../../../../core/domain";
import type { ScraperArtistDTO } from "../../../scraper";
import type { ArtistDTO } from "../../dto";
import type { ArtistRepo } from "../../interfaces";

export interface ArtistMapper {
  persistanceToDTO(artist: ArtistRepo, userId: UserId): ArtistDTO;
  scraperToDTO(artist: ScraperArtistDTO): ArtistDTO;
}
