import type { Artist, Track, Label, User } from "@br/core";

interface ApiResponse {
  error?: string;
}

export interface ArtistResponse extends ApiResponse {
  data: Artist;
}

export interface ArtistsResponse extends ApiResponse {
  data: Artist[];
}

export interface TracksResponse extends ApiResponse {
  data: Track[];
}

export interface LabelsResponse extends ApiResponse {
  data: Label[];
}

export interface LabelResponse extends ApiResponse {
  data: Label;
}

export interface UserResponse extends ApiResponse {
  data: User;
}

export interface TokenResponse extends ApiResponse {
  data: string;
}
