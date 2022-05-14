import { useMemo } from "react";
import { secondsToMinutes } from "utils";

interface Props {
  currentTime: number;
  duration: number;
}

interface usePlayerTimelineResponse {
  trackCurrentTime: string;
  trackDuration: string;
  progress: number;
}

export const usePlayerTimeline = ({ currentTime, duration }: Props): usePlayerTimelineResponse => {
  const trackCurrentTime = useMemo(() => {
    return secondsToMinutes(currentTime);
  }, [currentTime]);

  const trackDuration: string = useMemo(() => {
    return secondsToMinutes(duration);
  }, [duration]);

  const progress = useMemo(() => {
    return currentTime / duration;
  }, [trackCurrentTime, trackDuration]);

  return {
    trackCurrentTime,
    trackDuration,
    progress,
  };
};
