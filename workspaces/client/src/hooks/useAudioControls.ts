import { useState, useEffect, useMemo } from "react";
import { usePlayerContext } from "context/player";

export const useAudioControls = () => {
  const { audioRef, currentTrack, playlist, loadPlaylist } = usePlayerContext();
  const [curretTrackIndex, setCurrentTrackIndex] = useState<number>(0);

  const handlePlay = (): void => {
    const isPaused = audioRef.current?.paused;

    if (isPaused) audioRef.current?.play();
    else audioRef.current?.pause();
  };

  const handleNextTrack = (): void => {
    if (curretTrackIndex + 1 < playlist.length) {
      setCurrentTrackIndex(curretTrackIndex + 1);
      loadPlaylist({ playlist, track: playlist[curretTrackIndex + 1] });
    }
  };

  const handlePrevTrack = (): void => {
    if (curretTrackIndex - 1 >= 0) {
      setCurrentTrackIndex(curretTrackIndex - 1);
      loadPlaylist({ playlist, track: playlist[curretTrackIndex - 1] });
    }
  };

  const handleTimelineChange = (newTimeline: number): void => {
    if (audioRef.current) audioRef.current.currentTime = newTimeline;
  };

  const isFirstTrack: boolean = useMemo(() => {
    return playlist.length > 0 && playlist[0].id === currentTrack.id;
  }, [currentTrack, playlist]);

  const isLastTrack: boolean = useMemo(() => {
    return playlist.length > 0 && playlist[playlist.length - 1].id === currentTrack.id;
  }, [currentTrack, playlist]);

  useEffect(() => {
    const trackIndex = playlist.findIndex((trackItem) => trackItem.id === currentTrack.id);
    setCurrentTrackIndex(trackIndex);
  }, [currentTrack, playlist]);

  return {
    isFirstTrack,
    isLastTrack,
    handlePlay,
    handleNextTrack,
    handlePrevTrack,
    handleTimelineChange,
  };
};
