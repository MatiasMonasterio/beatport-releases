import type { Track } from "types";

import { useState, useEffect } from "react";
import { Container, Heading } from "@chakra-ui/react";

import { MetaTags, TrackList } from "components";
import { getLabelReleases } from "services/labels";

export default function LabelReleases(): JSX.Element {
  const [releases, setReleases] = useState<Track[]>([]);

  useEffect(() => {
    getLabelReleases().then((releases) => {
      setReleases(releases);
    });
  }, []);

  return (
    <>
      <MetaTags title="Labels Releases" />

      <Container maxW="container.xl" mt={{ base: 16, sm: 20 }}>
        <Heading as="h2" size="md" mb={4}>
          Last Releases
        </Heading>
      </Container>

      <TrackList tracks={releases} setTracks={setReleases} />
    </>
  );
}
