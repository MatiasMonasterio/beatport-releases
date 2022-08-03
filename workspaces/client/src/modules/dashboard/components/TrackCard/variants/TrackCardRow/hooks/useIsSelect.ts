import type { Track } from "@br/core";

import { useMemo } from "react";

export default function useIsSelected(track: Track, currentTrack: Track) {
  const isSelect = useMemo(() => {
    return currentTrack.id === track.id;
  }, [currentTrack]);

  return isSelect;
}
