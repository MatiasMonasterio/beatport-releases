import type { Track } from "types";

import { useState, useEffect } from "react";
import { Container, Heading, Flex } from "@chakra-ui/react";

import { TrackCard } from "components";
import { getLabelReleases } from "services/labels";

export default function LabelReleases(): JSX.Element {
  const [releases, setReleases] = useState<Track[]>([]);

  useEffect(() => {
    getLabelReleases().then((releases) => {
      setReleases(releases);
    });
  }, []);

  return (
    <Container maxW="container.xl" mt={24}>
      <Heading as="h2" size="lg" mb={10}>
        Last Releases
      </Heading>

      <Flex direction="column" gap={2}>
        {releases.map((release) => (
          <TrackCard {...release} key={release.name} />
        ))}
      </Flex>
    </Container>
  );
}
