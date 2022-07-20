import type { Track } from "@br/core";

import { useState, useEffect } from "react";
import { Flex, Box } from "@chakra-ui/react";

import { usePlayerContext } from "@/dashboard/contexts/player";

import TrackRow from "./TrackRow";
import TrackCardLoader from "./TrackCardLoader";
import SortDesktop from "./SortDesktop";
import SortMobile from "./SortMobile";

import { useFilter } from "./useFilter";

interface ITrack extends Track {
  createdAt?: number;
}

export enum trackFilter {
  released = "released",
  bpm = "bpm",
  genres = "genres",
  name = "name",
  createdAt = "createdAt",
}

export interface Props {
  tracks: ITrack[];
  isLoading: boolean;
  favoritesList?: boolean;
}

export default function TrackList({ tracks, isLoading, favoritesList }: Props): JSX.Element {
  const [innerTracks, setInnerTracks] = useState<ITrack[]>([]);

  const { loadPlaylist } = usePlayerContext();
  const { filterSelected, isDescFilter, handleSort } = useFilter(innerTracks, setInnerTracks);

  const handlePlayTrack = (track: Track): void => {
    loadPlaylist({ track, playlist: innerTracks });
  };

  useEffect(() => {
    setInnerTracks(tracks);
  }, [tracks]);

  return (
    <>
      <Box
        borderBottom="1px solid"
        borderColor="secondary.black.600"
        py={{ base: 0, sm: 2 }}
        mb={3}
        position="sticky"
        top={{ base: "57px", sm: "65px" }}
        zIndex={50}
        backgroundColor="secondary.black.900"
      >
        <SortDesktop
          favoritesList={favoritesList}
          filter={filterSelected}
          isDesc={isDescFilter < 0}
          sortTitle={() => handleSort(trackFilter.name)}
          sortBpm={() => handleSort(trackFilter.bpm)}
          sortGenre={() => handleSort(trackFilter.genres)}
          sortReleased={() => handleSort(trackFilter.released)}
        />

        <Box display={{ base: "block", sm: "none" }}>
          <SortMobile
            filter={filterSelected}
            isDesc={isDescFilter < 0}
            sortTitle={() => handleSort(trackFilter.name)}
            sortBpm={() => handleSort(trackFilter.bpm)}
            sortGenre={() => handleSort(trackFilter.genres)}
            sortReleased={() => handleSort(trackFilter.released)}
          />
        </Box>
      </Box>

      <Flex direction="column" gap={2} role="list">
        {isLoading && [1, 2, 3, 4].map((value) => <TrackCardLoader key={value} />)}

        {!isLoading &&
          innerTracks.length > 0 &&
          innerTracks.map((track) => (
            <TrackRow
              isFavoriteList={favoritesList}
              track={track}
              onPlay={handlePlayTrack}
              key={track.id}
            />
          ))}

        {!isLoading && !innerTracks.length && (
          <Box py={5} color="secondary.gray.700">
            No results to show...
          </Box>
        )}
      </Flex>
    </>
  );
}
