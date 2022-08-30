import type { ArtistDB } from "@prisma/client";

export interface ArtistRepo extends ArtistDB {
  _count: { tracks: number };
  users: { id: number }[];
}
