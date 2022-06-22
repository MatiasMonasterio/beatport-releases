import { NavLink } from "react-router-dom";
import { Flex, Image, Box, Link, Text } from "@chakra-ui/react";

import { Favorite, MotionText } from "components";
import { usePlayerContext } from "context/player";

export default function TrackCard(): JSX.Element {
  const { currentTrack } = usePlayerContext();
  const { name, mix, artwork, label, artists } = currentTrack;

  return (
    <Flex gap={4}>
      <Image src={artwork} h={14} w={14} />

      <Box fontSize="sm" overflow="hidden">
        <MotionText>
          <Text fontWeight="bold">
            {name} {mix}
          </Text>
        </MotionText>

        <MotionText lineHeight={1}>
          {artists &&
            artists.map((artist) => (
              <Link
                as={NavLink}
                key={artist.id}
                to={`/artist/${artist.id}`}
                fontSize="xs"
                color="gray.400"
                lineHeight={1}
                _notLast={{ _after: { content: `", "` } }}
              >
                {artist.name}
              </Link>
            ))}
        </MotionText>

        <MotionText>
          <Link
            as={NavLink}
            to={`/label/${label?.id}`}
            fontSize="xs"
            color="gray.400"
            d="inline-block"
            lineHeight={1}
          >
            {label?.name}
          </Link>
        </MotionText>
      </Box>

      <Favorite track={currentTrack} />
    </Flex>
  );
}
