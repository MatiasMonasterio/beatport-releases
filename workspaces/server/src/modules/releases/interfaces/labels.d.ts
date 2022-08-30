import type { LabelDB } from "@prisma/client";

export interface LabelRepo extends LabelDB {
  _count: { tracks: number };
  users: { id: number }[];
}
