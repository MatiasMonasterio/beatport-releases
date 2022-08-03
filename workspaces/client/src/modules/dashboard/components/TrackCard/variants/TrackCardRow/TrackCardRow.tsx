import type { Track } from "@br/core";

import { Flex, Image, Box, Text } from "@chakra-ui/react";

import { TrackCardLink } from "@/dashboard/components/TrackCard/components";
import { usePlayerContext } from "@/dashboard/contexts/player";

import { useIsSelect } from "./hooks";

interface Props {
  track: Track;
  onPlay: () => void;
}

export default function TrackCardRow({ track, onPlay }: Props) {
  const { name, mix, artwork, label, artists } = track;
  const { currentTrack } = usePlayerContext();

  const isSelect = useIsSelect(track, currentTrack);

  return (
    <Flex gap={4}>
      <Image src={artwork} h={16} w={16} onClick={onPlay} cursor="pointer" />

      <Box fontSize="sm" overflow="hidden">
        <Text fontWeight="medium" color={isSelect ? "primary.green" : "secondary.gray.200"}>
          {name} {mix}
        </Text>

        <Text lineHeight={1}>
          {artists &&
            artists.map((artist) => (
              <TrackCardLink content={artist.name} to={`/artist/${artist.id}`} key={artist.id} />
            ))}
        </Text>

        <TrackCardLink content={label?.name} to={`/label/${label?.id}`} />
      </Box>
    </Flex>
  );
}
