import type { Track, ApiParams } from "@br/core";

import { useEffect } from "react";
import { Flex, Box } from "@chakra-ui/react";

import { useGetInitialData } from "hooks";
import { usePlayerContext } from "@/dashboard/contexts/player";
import { TrackRowLoader } from "@/dashboard/components";

import { TrackRow, Sort } from "./components";
import { useParams, useOrderBy } from "./hooks";

export interface Props {
  favoritesList?: boolean;
  request: (params?: ApiParams) => Promise<Track[]>;
  onLoad?: (tracks: Track[]) => void;
}

export default function TrackList({ favoritesList, request, onLoad }: Props): JSX.Element {
  const { loadPlaylist } = usePlayerContext();
  const { filter, order, handleOrderBy } = useOrderBy();
  const { params } = useParams({ filter, order });

  const { data: tracks, isLoading } = useGetInitialData({
    request: () => request(params),
    defaultValue: [],
    deps: [params],
  });

  const handlePlayTrack = (track: Track): void => {
    loadPlaylist({ track, playlist: tracks });
  };

  useEffect(() => {
    onLoad && onLoad(tracks);
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
        <Sort
          favoritesList={favoritesList}
          filter={filter}
          isDesc={order === "desc"}
          onSortBy={handleOrderBy}
        />
      </Box>

      <Flex direction="column" gap={2} role="list">
        {isLoading && [1, 2, 3, 4].map((value) => <TrackRowLoader key={value} />)}

        {!isLoading &&
          tracks.map((track) => (
            <TrackRow
              isFavoriteList={favoritesList}
              track={track}
              onPlay={handlePlayTrack}
              key={track.id}
            />
          ))}

        {!isLoading && !tracks.length && (
          <Box py={5} color="secondary.gray.700">
            No results to show...
          </Box>
        )}
      </Flex>
    </>
  );
}
