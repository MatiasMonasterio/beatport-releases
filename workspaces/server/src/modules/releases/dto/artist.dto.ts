import {
  ArtistId,
  ArtistName,
  ArtistArtwork,
  ArtistFollow,
  ArtistProfile,
  ArtistsTracksCount,
} from "../../../core/domain";

export interface ArtistDTO {
  id: ArtistId;
  name: ArtistName;
  tracksCount: ArtistsTracksCount;
  follow: ArtistFollow;
  profile: ArtistProfile;
  artwork?: ArtistArtwork;
}

export interface CreateArtistDTO {
  id: ArtistId;
  name: ArtistName;
  tracksCount: ArtistsTracksCount;
  follow: ArtistFollow;
  profile: ArtistProfile;
  artwork: ArtistArtwork;
}
