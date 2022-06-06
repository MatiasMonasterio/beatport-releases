import type { Track } from "@br/core";

import { useEffect, useState } from "react";
import { Heading, Container } from "@chakra-ui/react";

import { useFetch } from "hooks";
import { MetaTags, TrackList } from "components";
import { getArtistReleases } from "services/artists";

export default function ArtistsReleases(): JSX.Element {
  const [releases, setReleases] = useState<Track[]>([]);
  const { fetch, isLoading } = useFetch();

  useEffect(() => {
    fetch<Track[]>(getArtistReleases).then((tracks) => {
      tracks && setReleases(tracks);
    });
  }, []);

  return (
    <>
      <MetaTags title="Artists Releases" />

      <Container maxW="container.xl" mt={{ base: 16, sm: 20 }}>
        <Heading as="h2" size="md" mb={4}>
          Releases
        </Heading>
      </Container>

      <TrackList tracks={releases} setTracks={setReleases} isLoading={isLoading} />
    </>
  );
}
