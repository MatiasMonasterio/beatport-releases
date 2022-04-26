import type { Artist } from "types";

import { Link } from "react-router-dom";
import { Flex, Heading, Text, Box } from "@chakra-ui/react";

export default function ArtistCard({ name, tracksCount, artwork, id }: Artist) {
  return (
    <Link to={`/artists/${id}`}>
      <Flex
        backgroundImage={artwork}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center"
        borderRadius="sm"
        overflow="hidden"
        h={200}
        align="end"
        position="relative"
        _after={{
          content: `""`,
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.6)",
        }}
      >
        <Box p={4} position="relative" zIndex={1} backgroundColor="rgba(0,0,0,0.6)" w="100%">
          <Heading size="md">{name}</Heading>
          <Text fontSize="sm" color="gray.400">
            {tracksCount} releases
          </Text>
        </Box>
      </Flex>
    </Link>
  );
}
