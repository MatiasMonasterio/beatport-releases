import { useState, useEffect } from "react";

interface useProgressArgs {
  duration: number;
  currentTime: number;
}

export default function useProgress({ duration, currentTime }: useProgressArgs) {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const newCurrentTime = Math.trunc((currentTime / duration) * 100) / 100;
    if (progress !== newCurrentTime) setProgress(newCurrentTime);
  }, [currentTime, duration]);

  return {
    progress,
  };
}
