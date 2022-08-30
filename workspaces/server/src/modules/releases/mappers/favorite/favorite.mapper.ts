import type { TrackDTO } from "../../dto";
import type { FavoriteRepo } from "../../interfaces";
import type { FavoriteMapper } from "./favorite.mapper.d";

const favoriteMapper: FavoriteMapper = {
  persistenceToDTO: (favorite: FavoriteRepo): TrackDTO => ({
    id: favorite.track.id,
    artists: favorite.track.artists,
    bpm: favorite.track.bpm,
    released: favorite.track.released,
    genre: favorite.track.genre,
    artwork: favorite.track.artwork,
    key: favorite.track.key,
    label: favorite.track.label,
    mix: favorite.track.mix,
    remixers: favorite.track.remixers,
    name: favorite.track.name,
    preview: favorite.track.preview,
    favorite: true,
  }),
};

export default favoriteMapper;
