import type { Track } from "@br/core";

import { Button, Text } from "@chakra-ui/react";
import { BiPlay } from "react-icons/bi";

import { usePlayerContext } from "@/dashboard/contexts/player";

interface Props {
  playlist: Track[];
  disabled?: boolean;
}

export default function PlayButtonPlaylist({ playlist, disabled }: Props) {
  const { loadPlaylist } = usePlayerContext();

  const handlePlay = () => {
    loadPlaylist({ track: playlist[0], playlist: playlist });
  };

  return (
    <Button
      bgColor="secondary.gray.200"
      color="secondary.black.800"
      gap={4}
      borderRadius="full"
      px={3}
      py={7}
      onClick={handlePlay}
      disabled={disabled}
    >
      <Text as="span" fontSize="3xl">
        <BiPlay />
      </Text>
    </Button>
  );
}
