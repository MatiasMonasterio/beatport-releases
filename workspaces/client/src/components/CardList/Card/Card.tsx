import type { Type, CardData } from "../types";

import { Link } from "react-router-dom";
import { LinkBox, Box, LinkOverlay, Heading, VStack, Text } from "@chakra-ui/react";

import { MotionText } from "components";
import { useMotionText } from "components/MotionText";

interface Props {
  data: CardData;
  type: Type;
  height: number | { base: number; sm: number };
}

export default function Card({ data, type, height }: Props) {
  const { artwork, name, id, tracks } = data;
  const { ref, onHoverStart, onHoverEnd } = useMotionText();

  return (
    <LinkBox
      as="article"
      display="flex"
      alignItems="end"
      role="group"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <VStack w="100%">
        <Box
          height={height}
          bgImg={artwork}
          bgSize="cover"
          bgPos="center"
          overflow="hidden"
          w="100%"
          borderRadius="lg"
          position="relative"
          _after={{
            content: `""`,
            display: "block",
            position: "absolute",
            width: "100%",
            height: "100%",
            bgColor: "blackAlpha.400",
            left: 0,
            top: 0,
          }}
        />

        <Box w="100%" overflow="hidden">
          <LinkOverlay as={Link} to={`/${type}/${id}`}>
            <MotionText ref={ref}>
              <Heading as="h2" size="sm" color="gray.200">
                {name}
              </Heading>
            </MotionText>

            <Text fontSize="xs" color="gray.500">
              {tracks.length} tracks
            </Text>
          </LinkOverlay>
        </Box>
      </VStack>
    </LinkBox>
  );
}
