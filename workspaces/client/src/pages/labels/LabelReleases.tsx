import type { Track } from "@br/core";

import { useState, useEffect } from "react";
import { Container, Heading } from "@chakra-ui/react";

import { useFetch } from "hooks";
import { MetaTags, TrackList } from "components";
import { getLabelReleases } from "services/labels";

export default function LabelReleases(): JSX.Element {
  const [releases, setReleases] = useState<Track[]>([]);
  const { fetch, isLoading } = useFetch();

  useEffect(() => {
    fetch<Track[]>(getLabelReleases).then((releases) => {
      releases && setReleases(releases);
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

      <TrackList tracks={releases} setTracks={setReleases} isLoading={isLoading} />
    </>
  );
}
