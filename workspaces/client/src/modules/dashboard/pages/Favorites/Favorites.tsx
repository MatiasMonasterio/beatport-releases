import type { Track } from "@br/core";

import { useEffect, useState } from "react";
import { Container, Heading } from "@chakra-ui/react";

import { MetaTags } from "components";
import { useHttpRequest } from "hooks";

import { TrackList } from "@/dashboard/components";
import { getFavorites } from "@/dashboard/services/favorites";

export default function Fovorites() {
  const [favorites, setFavorites] = useState<Track[]>([]);
  const { callRequest, isLoading } = useHttpRequest();

  useEffect(() => {
    callRequest(getFavorites).then((tracks) => {
      setFavorites(tracks);
    });
  }, []);

  return (
    <>
      <MetaTags title="Favorites" />

      <Container maxW="container.xl" mt={{ base: 16, sm: 20 }}>
        <Heading as="h2" size="md" mb={4}>
          My Favorites Tracks
        </Heading>

        <TrackList tracks={favorites} isLoading={isLoading} favoritesList />
      </Container>
    </>
  );
}
