import { Container, Heading } from "@chakra-ui/react";

import { MetaTags } from "components";
import { useGetInitialData } from "hooks";

import { TrackList } from "@/dashboard/components";
import { getFavorites } from "@/dashboard/services/favorites";

export default function Fovorites() {
  const { data: favorites, isLoading } = useGetInitialData({
    request: getFavorites,
    defaultValue: [],
  });

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
