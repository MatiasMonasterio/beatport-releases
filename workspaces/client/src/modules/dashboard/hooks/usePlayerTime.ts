import { useEffect, useState } from "react";
import { usePlayerContext } from "@/dashboard/contexts/player";

export default function usePlayerTime() {
  const { audioRef } = usePlayerContext();

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
