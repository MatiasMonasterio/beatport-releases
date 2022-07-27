import { VStack, Skeleton, Heading } from "@chakra-ui/react";

import { MetaTags } from "components";
import { useGetInitialData } from "hooks";

import { TrackList } from "@/dashboard/components";
import { getArtistReleases } from "@/dashboard/services/artists";

export default function ArtistsReleases(): JSX.Element {
  const { data: releases, isLoading } = useGetInitialData({
    request: getArtistReleases,
    defaultValue: [],
  });

  return (
    <>
      <MetaTags title="Artists Releases" />

      <VStack mb={4} align="flex-start">
        {isLoading && <Skeleton width="110px" h="1.5rem" />}

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
