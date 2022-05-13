import type { Label } from "types";

import { Link } from "react-router-dom";
import { LinkBox, LinkOverlay, Heading, Box, Text } from "@chakra-ui/react";

export default function LabelCard({ name, artwork, tracks, id }: Label) {
  return (
    <LinkBox
      as="article"
      height={250}
      bgImg={artwork}
      bgSize="cover"
      bgPos="center"
      display="flex"
      alignItems="end"
    >
      <Box p={4} backgroundColor="rgba(0,0,0,0.6)" w="100%">
        <LinkOverlay as={Link} to={`/label/${id}`}>
          <Heading as="h2" size="sm">
            {name}
          </Heading>
        </LinkOverlay>

        <Text fontSize="sm" color="gray.400">
          {tracks.length} releases
        </Text>
      </Box>
    </LinkBox>
  );
}
