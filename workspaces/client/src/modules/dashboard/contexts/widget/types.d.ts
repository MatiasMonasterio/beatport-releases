import type { Track } from "@br/core";

export interface WidgetState {
  active: boolean;
  beatport: {
    active: boolean;
    track: Track;
  };
  youtube: {
    active: boolean;
    videoId: string;
  };
}
