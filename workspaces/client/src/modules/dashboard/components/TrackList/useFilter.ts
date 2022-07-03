import type { Track } from "@br/core";

interface ITrack extends Track {
  createdAt?: number;
}

import { useState, useEffect } from "react";
import { trackFilter } from "./TrackList";

export const useFilter = (tracks: ITrack[], setTracks: (tracks: ITrack[]) => void) => {
  const [isDescFilter, setisDescFilter] = useState<number>(-1);
  const [filterSelected, setFilterSelected] = useState<trackFilter>(trackFilter.released);

  const handleSort = (filter: trackFilter): void => {
    if (filterSelected !== filter) {
      setFilterSelected(filter);
      setisDescFilter(-1);
    } else {
      setisDescFilter(isDescFilter * -1);
    }
  };

  useEffect(() => {
    if (filterSelected === trackFilter.genres) {
      setTracks(
        [...tracks].sort(
          (a, b) =>
            a[filterSelected][0].name.localeCompare(b[filterSelected][0].name) * isDescFilter
        )
      );
    } else if (filterSelected === trackFilter.name) {
      setTracks(
        [...tracks].sort(
          (a, b) => a[filterSelected].localeCompare(b[filterSelected]) * isDescFilter
        )
      );
    } else if (filterSelected === trackFilter.createdAt) {
      setTracks(
        [...tracks].sort((a, b) => {
          if (a[filterSelected] && b[filterSelected]) {
            const val1 = a[filterSelected] as number;
            const val2 = b[filterSelected] as number;

            return (val1 - val2) * isDescFilter;
          }

          return -1;
        })
      );
    } else {
      const tracksSorted = [...tracks].sort((a, b) => {
        return (a[filterSelected] - b[filterSelected]) * isDescFilter;
      });

      setTracks(tracksSorted);
    }
  }, [isDescFilter, filterSelected]);

  return {
    handleSort,
    filterSelected,
    isDescFilter,
  };
};
