import type { Track } from "types";

import { useState, useEffect } from "react";
import { Heading, Flex, Container } from "@chakra-ui/react";

import { TrackCard } from "components";
import { usePlayerContext } from "context/player";
import { getArtistUpcomings } from "services/artists";

export default function ArtistsReleasesUpcoming(): JSX.Element {
  const [upcomings, setUpcomings] = useState<Track[]>([]);
  const { loadPlayer } = usePlayerContext();

  const handlePlayTrack = (track: Track): void => {
    loadPlayer({ track, playlist: upcomings });
  };

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
          <TrackCard track={upcoming} key={upcoming.id} handlePlayTrack={handlePlayTrack} />
        ))}
      </Flex>
    </Container>
  );
}
