import { useMemo } from "react";
import { secondsToMinutes } from "@/dashboard/utilities";

interface useTimeStringArgs {
  duration: number;
  currentTime: number;
  progress: number;
}

export default function useTimeString({ duration, currentTime, progress }: useTimeStringArgs) {
  const currentTimeString = useMemo(() => {
    return secondsToMinutes(currentTime);
  }, [progress]);

  const durationString = useMemo(() => {
    return secondsToMinutes(duration);
  }, [progress]);

  return {
    currentTimeString,
    durationString,
  };
}
