import { useEffect, useState } from "react";

interface usePlayerResponse {
  duration: number;
  currentTime: number;
}

export default function usePlayer(audioRef: React.RefObject<HTMLAudioElement>): usePlayerResponse {
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const handleLoadMetadata = (): void => {
    setDuration(audioRef.current?.duration || 0);
  };

  const handleTimeUpdate = (): void => {
    setCurrentTime(audioRef.current?.currentTime || 0);
  };

  useEffect(() => {
    audioRef.current?.addEventListener("loadedmetadata", handleLoadMetadata);
    audioRef.current?.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audioRef.current?.removeEventListener("loadedmetadata", handleLoadMetadata);
      audioRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  });

  return { duration, currentTime };
}
