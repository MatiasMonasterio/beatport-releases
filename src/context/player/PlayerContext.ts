import type { Track } from "types";
import { createContext } from "react";

const defaultValue: Track = {
  id: 0,
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
  currentTrack: Track;
  audioPlayer: React.RefObject<HTMLAudioElement>;
  loadPlayer: ({ track, playlist }: { track: Track; playlist: Track[] }) => void;
  nextTrack: () => void;
  prevTrack: () => void;
};

export const PlayerContext = createContext<PlayerContextProps>({
  currentTrack: defaultValue,
} as PlayerContextProps);
