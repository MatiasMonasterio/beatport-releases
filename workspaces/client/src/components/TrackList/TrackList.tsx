import type { Track } from "@br/core";

import { useState, useEffect } from "react";
import { Container, Flex, Box } from "@chakra-ui/react";

import { usePlayerContext } from "context/player";
import { TrackCard } from "components";

import SortDesktop from "./SortDesktop";
import SortMobile from "./SortMobile";

export enum trackFilter {
  released = "released",
  bpm = "bpm",
  genres = "genres",
  name = "name",
}

interface Props {
  tracks: Track[];
  setTracks: (tracks: Track[]) => void;
}

export default function TrackList({ tracks, setTracks }: Props): JSX.Element {
  const { loadPlaylist } = usePlayerContext();

  const [isDescFilter, setisDescFilter] = useState<number>(-1);
  const [filterSelected, setFilterSelected] = useState<trackFilter>(trackFilter.released);

  const handlePlayTrack = (track: Track): void => {
    loadPlaylist({ track, playlist: tracks });
  };

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
    } else {
      setTracks([...tracks].sort((a, b) => (a[filterSelected] - b[filterSelected]) * isDescFilter));
    }
  }, [isDescFilter, filterSelected]);

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
        <Container maxW="container.xl" display={{ base: "none", sm: "block" }}>
          <SortDesktop
            filter={filterSelected}
            isDesc={isDescFilter < 0}
            sortTitle={() => handleSort(trackFilter.name)}
            sortBpm={() => handleSort(trackFilter.bpm)}
            sortGenre={() => handleSort(trackFilter.genres)}
            sortReleased={() => handleSort(trackFilter.released)}
          />
        </Container>

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

      <Container maxW="container.xl">
        <Flex direction="column" gap={2}>
          {tracks.map((track) => (
            <TrackCard track={track} handlePlayTrack={handlePlayTrack} key={track.id} />
          ))}
        </Flex>
      </Container>
    </>
  );
}
