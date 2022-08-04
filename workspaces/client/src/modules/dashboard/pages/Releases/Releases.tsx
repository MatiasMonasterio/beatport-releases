import { Container, Box, Heading } from "@chakra-ui/react";

import { MetaTags } from "components";

import { TrackList } from "@/dashboard/components";
import { getReleases } from "@/dashboard/services/tracks";

export default function Releases() {
  return (
    <>
      <MetaTags title="Releases" />

      <Container maxW="container.xl" mt={{ base: 16, sm: 20 }}>
        <Box as="section">
          <Heading as="h2" size="md" mb={4}>
            Releases
          </Heading>

          <TrackList request={getReleases} />
        </Box>
      </Container>
    </>
  );
}
