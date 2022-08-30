import type { UserId } from "../../../../core/domain";
import type { ScraperTrackDTO } from "../../../scraper";
import type { TrackDTO } from "../../dto";
import type { TrackRepo } from "../../interfaces";
import type { TrackMapper } from "./track.mapper.d";

const trackMapper: TrackMapper = {
  persistanceToDTO: (track: TrackRepo, userId: UserId): TrackDTO => {
    return {
      id: track.id,
      artists: track.artists,
      bpm: track.bpm,
      released: track.released,
      genre: track.genre,
      artwork: track.artwork,
      key: track.key,
      label: track.label,
      mix: track.mix,
      remixers: track.remixers,
      name: track.name,
      preview: track.preview,
      favorite: !!track.users?.some((user) => user.id === userId),
    };
  },

  scraperToDTO: (track: ScraperTrackDTO): TrackDTO => {
    return {
      id: track.id,
      artists: track.artists,
      bpm: track.bpm,
      released: new Date(track.released),
      genre: track.genre,
      artwork: track.artwork,
      key: track.key,
      label: track.label,
      mix: track.mix,
      remixers: track.remixers,
      name: track.name,
      preview: track.preview,
      favorite: false,
    };
  },
};

export default trackMapper;
