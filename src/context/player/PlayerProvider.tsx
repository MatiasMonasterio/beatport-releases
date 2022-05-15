import type { Track } from "types";
import { useState, useEffect, useRef } from "react";

import { PlayerContext } from "./PlayerContext";

interface Props {
  children: React.ReactNode;
}

export const PlayerProvider = ({ children }: Props): JSX.Element => {
  const audioPlayer = useRef<HTMLAudioElement>(null);

  const [currentTrack, setCurrentTrack] = useState<Track>({} as Track);
  const [currentPlaylist, setCurrentPlaylist] = useState<Track[]>([]);
  const [playlistTrackIndex, setPlaylistTrackIndex] = useState<number>(0);

  const loadPlayer = ({ track, playlist }: { track: Track; playlist: Track[] }): void => {
    const isPaused = audioPlayer.current?.paused;
    setCurrentPlaylist(playlist);

    const trackIndex = playlist.findIndex((trackItem) => trackItem.id === track.id);
    setPlaylistTrackIndex(trackIndex);

    if (currentTrack.id === track.id) {
      if (isPaused) audioPlayer.current.play();
      else audioPlayer.current?.pause();
    } else {
      setCurrentTrack(track);
      localStorage.setItem("player", JSON.stringify(track));
    }
  };

  const nextTrack = (): void => {
    if (playlistTrackIndex + 1 < currentPlaylist.length) {
      setPlaylistTrackIndex(playlistTrackIndex + 1);
      setCurrentTrack(currentPlaylist[playlistTrackIndex + 1]);
    }
  };

  const prevTrack = (): void => {
    if (playlistTrackIndex - 1 >= 0) {
      setPlaylistTrackIndex(playlistTrackIndex - 1);
      setCurrentTrack(currentPlaylist[playlistTrackIndex - 1]);
    }
  };

  const handleEnded = (): void => {
    setTimeout(nextTrack, 100);
  };

  useEffect(() => {
    const lastTrack = localStorage.getItem("player");
    lastTrack && setCurrentTrack(JSON.parse(lastTrack));
  }, []);

  useEffect(() => {
    audioPlayer.current?.addEventListener("ended", handleEnded);

    return () => {
      audioPlayer.current?.removeEventListener("ended", handleEnded);
    };
  });

  return (
    <PlayerContext.Provider value={{ currentTrack, loadPlayer, nextTrack, prevTrack, audioPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};
