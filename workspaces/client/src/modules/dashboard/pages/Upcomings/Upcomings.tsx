import type { Track } from "@br/core";

import { useState, useEffect } from "react";
import { Container, Box, Heading } from "@chakra-ui/react";

import { MetaTags } from "components";
import { useHttpRequest } from "hooks";

import { TrackList } from "@/dashboard/components";
import { getUpcomings } from "@/dashboard/services/tracks";

export default function Upcomings() {
  const { callRequest, isLoading } = useHttpRequest();
  const [upcomings, setUpcomings] = useState<Track[]>([]);

  useEffect(() => {
    callRequest(getUpcomings).then((upcomings) => {
      setUpcomings(upcomings);
    });
  }, []);
  return (
    <>
      <MetaTags title="Upcomings" />

      <Container maxW="container.xl" mt={{ base: 16, sm: 20 }}>
        <Box as="section">
          <Heading as="h2" size="md" mb={4}>
            Upcomings
          </Heading>

          <TrackList tracks={upcomings} isLoading={isLoading} />
        </Box>
      </Container>
    </>
  );
}
