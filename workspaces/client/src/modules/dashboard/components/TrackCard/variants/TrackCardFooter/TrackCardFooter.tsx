import type { Track } from "@br/core";

import { Flex, Image, Box, Text } from "@chakra-ui/react";

import { MotionText } from "@/dashboard/components";
import { TrackCardLink } from "@/dashboard/components/TrackCard/components";

interface Props {
  track: Track;
}

export default function TrackCardFooter({ track }: Props) {
  const { name, mix, artwork, label, artists } = track;

  return (
    <Flex gap={4}>
      <Image src={artwork} h={14} w={14} />

      <Box fontSize="sm" overflow="hidden">
        <MotionText>
          <Text fontWeight="medium" color="secondary.gray.200">
            {name} {mix}
          </Text>
        </MotionText>

        <MotionText lineHeight={1}>
          {artists &&
            artists.map((artist) => (
              <TrackCardLink content={artist.name} to={`/artist/${artist.id}`} key={artist.id} />
            ))}
        </MotionText>

        <MotionText>
          <TrackCardLink content={label?.name} to={`/label/${label?.id}`} />
        </MotionText>
      </Box>
    </Flex>
  );
}
