import type { Track } from "types";

import { useState, useEffect } from "react";
import { Container, Heading } from "@chakra-ui/react";

import { TrackList } from "components";
import { getLabelUpcomings } from "services/labels";

export default function LabelUpcomings(): JSX.Element {
  const [upcomings, setUpcomings] = useState<Track[]>([]);

  useEffect(() => {
    getLabelUpcomings().then((upcomings) => {
      upcomings && setUpcomings(upcomings);
    });
  }, []);

  return (
    <>
      <Container maxW="container.xl" mt={{ base: 16, sm: 20 }}>
        <Heading as="h2" size="md" mb={4}>
          Upcoming
        </Heading>
      </Container>

      <TrackList tracks={upcomings} setTracks={setUpcomings} />
    </>
  );
}
