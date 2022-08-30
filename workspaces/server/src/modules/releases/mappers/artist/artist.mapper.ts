import type { UserId } from "../../../../core/domain";
import type { ScraperArtistDTO } from "../../../scraper";
import type { ArtistDTO } from "../../dto";
import type { ArtistRepo } from "../../interfaces";
import type { ArtistMapper } from "./artist.mapper.d";

const BASE_ARTIST_PROFILE_URL = "https://www.beatport.com/artist/l/";

const artistMapper: ArtistMapper = {
  persistanceToDTO: (artist: ArtistRepo, userId: UserId): ArtistDTO => {
    return {
      id: artist.id,
      name: artist.name,
      tracksCount: artist._count.tracks,
      profile: `${BASE_ARTIST_PROFILE_URL}${artist.id}`,
      follow: artist.users.some((user) => user.id === userId),
      ...(artist.artwork && { artwork: artist.artwork }),
    };
  },

  scraperToDTO: (artist: ScraperArtistDTO): ArtistDTO => {
    return {
      id: artist.id,
      name: artist.name,
      profile: `${BASE_ARTIST_PROFILE_URL}${artist.id}`,
      follow: false,
      artwork: artist.artwork,
      tracksCount: artist.tracks.length,
    };
  },
};

export default artistMapper;
