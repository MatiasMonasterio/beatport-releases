import { Container, Box, Heading } from "@chakra-ui/react";

import { MetaTags } from "components";

import { TrackList } from "@/dashboard/components";
import { getUpcomings } from "@/dashboard/services/tracks";

export default function Upcomings() {
  return (
    <>
      <MetaTags title="Upcomings" />

      <Container maxW="container.xl" mt={{ base: 16, sm: 20 }}>
        <Box as="section">
          <Heading as="h2" size="md" mb={4}>
            Upcomings
          </Heading>

          <TrackList request={getUpcomings} />
        </Box>
      </Container>
    </>
  );
}
