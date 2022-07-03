import type { Track } from "@br/core";

import { useEffect, useState } from "react";
import { HStack, Skeleton, Heading } from "@chakra-ui/react";

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

      <HStack justify="space-between" mb={4} align="center">
        {isLoading && (
          <Skeleton width="110px" h="1.5rem" startColor="gray.800" endColor="gray.700" />
        )}

        {!isLoading && (
          <Heading as="h2" size="md">
            {releases.length} Artists
          </Heading>
        )}
      </HStack>
      <TrackList tracks={releases} isLoading={isLoading} />
    </>
  );
}
