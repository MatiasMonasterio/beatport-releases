import type { Track } from "@br/core";

import { useEffect, useState } from "react";
import { Container, Box, Heading } from "@chakra-ui/react";

import { MetaTags } from "components";
import { useHttpRequest } from "hooks";

import { TrackList } from "@/dashboard/components";
import { getReleases } from "@/dashboard/services/tracks";

export default function Releases() {
  const { callRequest, isLoading } = useHttpRequest();
  const [releases, setReleases] = useState<Track[]>([]);

  useEffect(() => {
    callRequest(getReleases).then((tracks) => {
      setReleases(tracks);
    });
  }, []);

  return (
    <>
      <MetaTags title="Releases" />

      <Container maxW="container.xl" mt={{ base: 16, sm: 20 }}>
        <Box as="section">
          <Heading as="h2" size="md" mb={4}>
            Releases
          </Heading>

          <TrackList tracks={releases} isLoading={isLoading} />
        </Box>
      </Container>
    </>
  );
}
