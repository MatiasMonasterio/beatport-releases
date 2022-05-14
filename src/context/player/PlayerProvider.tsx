import type { Track } from "types";
import { useState, useEffect } from "react";

import { PlayerContext } from "./PlayerContext";

interface Props {
  children: React.ReactNode;
}

export const PlayerProvider = ({ children }: Props): JSX.Element => {
  const [track, setTrack] = useState<Track>({} as Track);

  const playTrack = (track: Track): void => {
    setTrack(track);
    localStorage.setItem("player", JSON.stringify(track));
  };

  useEffect(() => {
    const lastTrack = localStorage.getItem("player");
    lastTrack && setTrack(JSON.parse(lastTrack));
  }, []);

  return <PlayerContext.Provider value={{ track, playTrack }}>{children}</PlayerContext.Provider>;
};
