import type { Track } from "@br/core";

import { useState, useEffect } from "react";
import { Heading, Container } from "@chakra-ui/react";

import { useFetch } from "hooks";
import { MetaTags, TrackList } from "components";
import { getArtistUpcomings } from "services/artists";

export default function ArtistsReleasesUpcoming(): JSX.Element {
  const [upcomings, setUpcomings] = useState<Track[]>([]);
  const { fetch, isLoading } = useFetch();

  useEffect(() => {
    fetch<Track[]>(getArtistUpcomings).then((upcomings) => {
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

      <TrackList tracks={upcomings} setTracks={setUpcomings} isLoading={isLoading} />
    </>
  );
}
