import type { Track } from "types";

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
