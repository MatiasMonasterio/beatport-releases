import type { Track } from "@br/core";

import { useEffect, useState } from "react";
import { VStack, Skeleton, Heading } from "@chakra-ui/react";

import { MetaTags } from "components";
import { useFetch } from "hooks";

import { TrackList } from "@/dashboard/components";
import { getArtistReleases } from "@/dashboard/services/artists";

export default function ArtistsReleases(): JSX.Element {
  const [releases, setReleases] = useState<Track[]>([]);
  const { fetch, isLoading } = useFetch();

  useEffect(() => {
    fetch<Track[]>(getArtistReleases).then((tracks) => {
      tracks && setReleases(tracks);
    });
  }, []);

  return (
    <>
      <MetaTags title="Artists Releases" />

      <VStack mb={4} align="flex-start">
        {isLoading && (
          <Skeleton width="110px" h="1.5rem" startColor="gray.800" endColor="gray.700" />
        )}

        {!isLoading && (
          <Heading as="h2" size="lg" mb={2}>
            {releases.length} Releases
          </Heading>
        )}
      </VStack>
      <TrackList tracks={releases} isLoading={isLoading} />
    </>
  );
}
