import type { Track } from "@br/core";

import { Flex, Image, Box, Text } from "@chakra-ui/react";

import { MotionText } from "@/dashboard/components";

import { TrackCardLink } from "@/dashboard/components/TrackCard/components";

interface Props {
  track: Track;
}

export default function TrackCardView({ track }: Props) {
  const { name, mix, artwork, label, artists } = track;

  return (
    <Flex gap={4} flexDirection="column" height="100%">
      <Flex flexGrow={1} alignItems="center">
        <Image src={artwork} width="100%" />
      </Flex>

      <Box overflow="hidden" mt="auto">
        <MotionText>
          <Text fontSize="2xl" fontWeight="medium" color="secondary.gray.200">
            {name} {mix}
          </Text>
        </MotionText>

        <MotionText lineHeight={1}>
          {artists &&
            artists.map((artist) => (
              <TrackCardLink
                size="md"
                content={artist.name}
                to={`/artist/${artist.id}`}
                key={artist.id}
              />
            ))}
        </MotionText>

        <MotionText>
          <TrackCardLink size="md" content={label?.name} to={`/label/${label?.id}`} />
        </MotionText>
      </Box>
    </Flex>
  );
}
