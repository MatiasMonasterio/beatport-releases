import { Container, Heading, Text } from "@chakra-ui/react";

import { MetaTags } from "components";

export default function Fovorites() {
  return (
    <>
      <MetaTags title="Favorites" />

      <Container maxW="container.xl" mt={{ base: 16, sm: 20 }}>
        <Heading as="h2" size="md" mb={8}>
          My Favorites Tracks
        </Heading>

        <Text color="gray.400">Work in progres...</Text>
      </Container>
    </>
  );
}
