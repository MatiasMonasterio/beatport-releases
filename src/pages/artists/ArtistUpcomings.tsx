import type { Track } from "types";

import { useState, useEffect } from "react";
import { Heading, Flex, Container } from "@chakra-ui/react";

import { TrackCard } from "components";
import { getArtistUpcomings } from "services/artists";

export default function ArtistsReleasesUpcoming(): JSX.Element {
  const [upcomings, setUpcomings] = useState<Track[]>([]);

  useEffect(() => {
    getArtistUpcomings().then((upcomings) => {
      upcomings && setUpcomings(upcomings);
    });
  }, []);

  return (
    <Container maxW="container.xl" mt={24}>
      <Heading as="h2" size="lg" mb={10}>
        Upcoming
      </Heading>

      <Flex direction="column" gap={2}>
        {upcomings.map((upcoming) => (
          <TrackCard {...upcoming} key={upcoming.id} />
        ))}
      </Flex>
    </Container>
  );
}
