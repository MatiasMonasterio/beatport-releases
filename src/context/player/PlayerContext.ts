import type { Track } from "types";
import { createContext } from "react";

const defaultValue: Track = {
  name: "",
  mix: "",
  preview: "",
  artwork: "",
  artists: [],
  label: { name: "", id: 0, slug: "" },
  bpm: 0,
  released: 0,
  genres: [],
  key: "",
  remixers: [],
};

export type PlayerContextProps = {
  track: Track;
  playTrack: (track: Track) => void;
};

export const PlayerContext = createContext<PlayerContextProps>({
  track: defaultValue,
} as PlayerContextProps);
