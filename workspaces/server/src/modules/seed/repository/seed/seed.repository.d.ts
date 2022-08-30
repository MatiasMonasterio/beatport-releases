import type { User, Artist, Label } from "@br/core";

export interface SeedRepository {
  restartAndLoadData: (user: User, artists: Artist[], labels: Label[]) => Promise<void>;
}
