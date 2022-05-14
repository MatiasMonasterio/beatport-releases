import type { Track } from "types";

import { NavLink } from "react-router-dom";
import { Flex, Image, Box, Text, Link } from "@chakra-ui/react";

type Props = Omit<Track, "bpm" | "released" | "genres" | "remixers" | "preview">;

export default function TrackCard({ name, mix, artwork, label, artists }: Props): JSX.Element {
  return (
    <Flex gap={4}>
      <Image src={artwork} h={16} />

      <Box fontSize="sm">
        <Text fontWeight="bold">
          {name} {mix}
        </Text>

        <Box>
          {artists &&
            artists.map((artist) => (
              <Link
                as={NavLink}
                key={artist.id}
                to={`/artist/${artist.id}`}
                fontSize="xs"
                color="gray.400"
                _notLast={{
                  _after: { content: `", "` },
                }}
              >
                {artist.name}
              </Link>
            ))}
        </Box>

        <Link
          as={NavLink}
          to={`/label/${label?.id}`}
          fontSize="xs"
          color="gray.400"
          d="inline-block"
        >
          {label?.name}
        </Link>
      </Box>
    </Flex>
  );
}
