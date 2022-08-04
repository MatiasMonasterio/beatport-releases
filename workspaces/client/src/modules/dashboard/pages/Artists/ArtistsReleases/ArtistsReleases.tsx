import { useState } from "react";
import { VStack, Heading } from "@chakra-ui/react";

import { MetaTags } from "components";

import { TrackList } from "@/dashboard/components";
import { getArtistReleases } from "@/dashboard/services/artists";

export default function ArtistsReleases(): JSX.Element {
  const [resultsLength, setResultsLength] = useState(0);

  return (
    <>
      <MetaTags title="Artists Releases" />

      <VStack mb={4} align="flex-start">
        <Heading as="h2" size="lg" mb={2}>
          {resultsLength} Releases
        </Heading>
      </VStack>

      <TrackList request={getArtistReleases} onLoad={setResultsLength} />
    </>
  );
}
