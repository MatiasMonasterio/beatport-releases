import type { Track } from "@br/core";

import { useState, useLayoutEffect } from "react";
import { usePlayerContext } from "@/dashboard/contexts/player";

export default function useFavoriteState(track: Track) {
  const [isFavorite, setIsFavorite] = useState<boolean>(!!track.favorite);
  const { currentTrack } = usePlayerContext();

  const togglefavorite = () => {
    setIsFavorite((value) => !value);
  };

  useLayoutEffect(() => {
    setIsFavorite(!!track.favorite);
  }, [track]);

  useLayoutEffect(() => {
    if (currentTrack && currentTrack.id === track.id) {
      setIsFavorite(!!currentTrack.favorite);
    }
  }, [currentTrack]);

  return {
    isFavorite,
    togglefavorite,
  };
}
