import type { TrackDTO } from "./track.dto";

export interface FavoriteDTO extends TrackDTO {
  createdAt: number;
}
