import type { Track } from "@br/core";

import { useEffect, useState } from "react";
import { Container, Box, Heading } from "@chakra-ui/react";

import { MetaTags, TrackList } from "components";
import { useFetch } from "hooks";
import { getReleases } from "services/tracks";

export default function Releases() {
  const { fetch, isLoading } = useFetch();
  const [releases, setReleases] = useState<Track[]>([]);

  useEffect(() => {
    fetch<Track[]>(getReleases).then((tracks) => {
      tracks && setReleases(tracks);
    });
  }, []);

  return (
    <>
      <MetaTags title="Releases" />

      <Container maxW="container.xl" mt={{ base: 16, sm: 20 }}>
        <Box as="section">
          <Heading as="h2" size="md" mb={8}>
            Releases
          </Heading>

          <TrackList tracks={releases} setTracks={setReleases} isLoading={isLoading} />
        </Box>
      </Container>
    </>
  );
}
