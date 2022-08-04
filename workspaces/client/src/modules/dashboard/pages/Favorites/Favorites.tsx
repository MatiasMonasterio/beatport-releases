import { Container, Heading } from "@chakra-ui/react";

import { MetaTags } from "components";

import { TrackList } from "@/dashboard/components";
import { getFavorites } from "@/dashboard/services/favorites";

export default function Fovorites() {
  return (
    <>
      <MetaTags title="Favorites" />

      <Container maxW="container.xl" mt={{ base: 16, sm: 20 }}>
        <Heading as="h2" size="md" mb={4}>
          My Favorites Tracks
        </Heading>

        <TrackList request={getFavorites} favoritesList />
      </Container>
    </>
  );
}
