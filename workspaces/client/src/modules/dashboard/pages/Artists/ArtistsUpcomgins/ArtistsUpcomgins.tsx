import type { Track } from "@br/core";

import { useEffect, useState } from "react";
import { VStack, Skeleton, Heading } from "@chakra-ui/react";

import { MetaTags } from "components";
import { useHttpRequest } from "hooks";

import { TrackList } from "@/dashboard/components";
import { getArtistUpcomings } from "@/dashboard/services/artists";

export default function ArtistsUpcomgins(): JSX.Element {
  const [releases, setReleases] = useState<Track[]>([]);
  const { callRequest, isLoading } = useHttpRequest();

  useEffect(() => {
    callRequest(getArtistUpcomings).then((tracks) => {
      setReleases(tracks);
    });
  }, []);

  return (
    <>
      <MetaTags title="Artists Releases" />

      <VStack mb={4} align="flex-start">
        {isLoading && <Skeleton width="110px" h="1.5rem" />}

        {!isLoading && (
          <Heading as="h2" size="lg" mb={2}>
            {releases.length} Upcomings
          </Heading>
        )}
      </VStack>
      <TrackList tracks={releases} isLoading={isLoading} />
    </>
  );
}
