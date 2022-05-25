import type { Track } from "types";

import { useState, useEffect } from "react";
import { Heading, Container } from "@chakra-ui/react";

import { MetaTags, TrackList } from "components";
import { getArtistUpcomings } from "services/artists";

export default function ArtistsReleasesUpcoming(): JSX.Element {
  const [upcomings, setUpcomings] = useState<Track[]>([]);

  useEffect(() => {
    getArtistUpcomings().then((upcomings) => {
      upcomings && setUpcomings(upcomings);
    });
  }, []);

  return (
    <>
      <MetaTags title="Artists Upcoming" />

      <Container maxW="container.xl" mt={{ base: 16, sm: 20 }}>
        <Heading as="h2" size="md" mb={4}>
          Upcoming
        </Heading>
      </Container>

      <TrackList tracks={upcomings} setTracks={setUpcomings} />
    </>
  );
}
