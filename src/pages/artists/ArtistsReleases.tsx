import type { Track } from "types";

import { useEffect, useState } from "react";
import { Heading, Flex, Container } from "@chakra-ui/react";

import { TrackCard } from "components";
import { getArtistReleases } from "services/artists";

export default function ArtistsReleases(): JSX.Element {
  const [releases, setReleases] = useState<Track[]>([]);

  useEffect(() => {
    getArtistReleases().then((releases) => {
      releases && setReleases(releases);
    });
  }, []);

  return (
    <Container maxW="container.xl" mt={24}>
      <Heading as="h2" size="lg" mb={10}>
        Last Releases
      </Heading>

      <Flex direction="column" gap={2}>
        {releases.map((release) => (
          <TrackCard {...release} key={release.id} />
        ))}
      </Flex>
    </Container>
  );
}
