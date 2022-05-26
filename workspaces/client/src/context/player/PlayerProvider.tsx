import type { Track } from "types";
import { useState, useEffect, useRef } from "react";

import { PlayerContext } from "./PlayerContext";

interface Props {
  children: React.ReactNode;
}

interface loadPlaylistArgs {
  track: Track;
  playlist: Track[];
}

export const PlayerProvider = ({ children }: Props): JSX.Element => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [currentTrack, setCurrentTrack] = useState<Track>({} as Track);
  const [currentPlaylist, setCurrentPlaylist] = useState<Track[]>([]);
  const [playlistTrackIndex, setPlaylistTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const loadPlaylist = ({ track, playlist }: loadPlaylistArgs): void => {
    const isPaused = audioRef.current?.paused;
    setCurrentPlaylist(playlist);

    const trackIndex = playlist.findIndex((trackItem) => trackItem.id === track.id);
    setPlaylistTrackIndex(trackIndex);

    if (currentTrack.id === track.id) {
      if (isPaused) audioRef.current.play();
      else audioRef.current?.pause();
    } else {
      setCurrentTrack(track);
      localStorage.setItem("player", JSON.stringify(track));
    }
  };

  const handleEnded = (): void => {
    setTimeout(() => {
      if (playlistTrackIndex + 1 < currentPlaylist.length) {
        setPlaylistTrackIndex(playlistTrackIndex + 1);
        setCurrentTrack(currentPlaylist[playlistTrackIndex + 1]);
      }
    }, 100);
  };

  const handlePlay = (): void => setIsPlaying(true);
  const handlePause = (): void => setIsPlaying(false);

  useEffect(() => {
    audioRef.current?.play();
  }, [currentTrack]);

  useEffect(() => {
    const lastTrack = localStorage.getItem("player");
    lastTrack && setCurrentTrack(JSON.parse(lastTrack));
  }, []);

  useEffect(() => {
    audioRef.current?.addEventListener("play", handlePlay);
    audioRef.current?.addEventListener("pause", handlePause);
    audioRef.current?.addEventListener("ended", handleEnded);

    return () => {
      audioRef.current?.removeEventListener("play", handlePlay);
      audioRef.current?.removeEventListener("pause", handlePause);
      audioRef.current?.removeEventListener("ended", handleEnded);
    };
  });

  return (
    <PlayerContext.Provider
      value={{
        audioRef,
        currentTrack,
        playlist: currentPlaylist,
        isPlaying,
        loadPlaylist,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
