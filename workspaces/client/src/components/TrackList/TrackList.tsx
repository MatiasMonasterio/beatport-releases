import type { Track } from "@br/core";

import { useState, useEffect } from "react";
import { Flex, Box } from "@chakra-ui/react";

import { usePlayerContext } from "context/player";
import { newFavoriteTrack, deleteFavoriteById } from "services/favorites";

import TrackCard from "./TrackCard";
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

interface Props {
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

  const handleFavorite = async (id: number, add: boolean): Promise<void> => {
    const trackIndex = innerTracks.findIndex((track) => track.id === id);
    if (trackIndex < 0) return;

    const tracksToSave = [...innerTracks];
    tracksToSave[trackIndex].favorite = add;

    setInnerTracks(tracksToSave);
    add ? await newFavoriteTrack(innerTracks[trackIndex]) : await deleteFavoriteById(id);
  };

  useEffect(() => {
    setInnerTracks(tracks);
  }, [tracks]);

  return (
    <>
      <Box
        borderBottom="1px solid"
        borderColor="gray.700"
        py={{ base: 0, sm: 2 }}
        mb={3}
        position="sticky"
        top={{ base: "57px", sm: "68px" }}
        zIndex={100}
        backgroundColor="gray.800"
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

      <Flex direction="column" gap={2}>
        {isLoading && [1, 2, 3, 4].map((value) => <TrackCardLoader key={value} />)}

        {!isLoading &&
          innerTracks.length > 0 &&
          innerTracks.map((track) => (
            <TrackCard
              favoritesList={favoritesList}
              track={track}
              handlePlayTrack={handlePlayTrack}
              key={track.id}
              onAddFavorite={(id) => handleFavorite(id, true)}
              onRemoveFavorite={(id) => handleFavorite(id, false)}
            />
          ))}

        {!isLoading && !innerTracks.length && (
          <Box py={5} color="gray.500">
            No results to show...
          </Box>
        )}
      </Flex>
    </>
  );
}
