import type { Track } from "types";

import { useEffect, useState } from "react";
import { Heading, Container } from "@chakra-ui/react";

import { TrackList } from "components";
import { getArtistReleases } from "services/artists";

export default function ArtistsReleases(): JSX.Element {
  const [releases, setReleases] = useState<Track[]>([]);

  useEffect(() => {
    getArtistReleases().then((releases) => {
      releases && setReleases(releases);
    });
  }, []);

  return (
    <>
      <Container maxW="container.xl" mt={{ base: 16, sm: 20 }}>
        <Heading as="h2" size="md" mb={4}>
          Releases
        </Heading>
      </Container>

      <TrackList tracks={releases} setTracks={setReleases} />
    </>
  );
}
