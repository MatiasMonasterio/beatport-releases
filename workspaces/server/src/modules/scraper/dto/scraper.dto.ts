import { BeatportTrackDTO } from "./tracks.dto";

export interface BeatportScraperDTO {
  name: string;
  artwork: string;
  tracks: BeatportTrackDTO[];
}
