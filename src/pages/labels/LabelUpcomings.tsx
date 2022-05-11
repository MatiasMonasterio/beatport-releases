import type { Track } from "types";

import { useState, useEffect } from "react";
import { Container, Heading, Flex } from "@chakra-ui/react";

import { TrackCard } from "components";
import { getLabelUpcomings } from "services/labels";

export default function LabelUpcomings(): JSX.Element {
  const [upcomings, setUpcomings] = useState<Track[]>([]);

  useEffect(() => {
    getLabelUpcomings().then((upcomings) => {
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
          <TrackCard {...upcoming} key={upcoming.name} />
        ))}
      </Flex>
    </Container>
  );
}
