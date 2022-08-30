import type { ArtistId, ArtistName, ArtistArtwork } from "../../../core/domain";
import type { ScraperTrackDTO } from "./tracks.dto";

export interface ScraperArtistDTO {
  id: ArtistId;
  name: ArtistName;
  artwork: ArtistArtwork;
  tracks: ScraperTrackDTO[];
}
