import type { Track } from "@br/core";
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
  genre: { name: "", id: 0, slug: "" },
  key: "",
  remixers: [],
};

export type PlayerContextProps = {
  audioRef: React.RefObject<HTMLAudioElement>;
  setCurrentTrack: (track: Track) => void;
  currentTrack: Track;
  playlist: Track[];
  isPlaying: boolean;
  loadPlaylist: ({ track, playlist }: { track: Track; playlist: Track[] }) => void;
};

export const PlayerContext = createContext<PlayerContextProps>({
  currentTrack: defaultValue,
} as PlayerContextProps);
