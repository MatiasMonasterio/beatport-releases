import type { BeatportTrackDTO, ScraperTrackDTO } from "../../dto";
import type { TrackMapper } from "./track.mapper.d";

const trackMapper: TrackMapper = {
  beatportToScraper: (track: BeatportTrackDTO): ScraperTrackDTO => {
    return {
      id: track.id,
      artists: track.artists,
      bpm: track.bpm,
      released: new Date(track.date.released).getTime(),
      genre: track.genres[0],
      artwork: track.images.small.url.replace("1400x1400", "100x100"),
      key: track.key,
      label: track.label,
      mix: track.mix,
      remixers: track.remixers,
      name: track.name,
      preview: track.preview.mp3.url,
    };
  },
};

export default trackMapper;
