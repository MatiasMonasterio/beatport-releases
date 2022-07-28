import type { ButtonProps } from "@chakra-ui/react";
import type { Track } from "@br/core";

import { useMemo } from "react";
import { Button } from "@chakra-ui/react";
import { BiPlay } from "react-icons/bi";

import { usePlayerContext } from "@/dashboard/contexts/player";

interface Props extends ButtonProps {
  playlist: Track[];
  size?: "md" | "sm";
  disabled?: boolean;
}

export default function PlayButtonPlaylist({ playlist, size = "md", disabled, ...args }: Props) {
  const { loadPlaylist } = usePlayerContext();

  const isSmall = useMemo(() => {
    return size === "sm";
  }, [size]);

  const handlePlay = () => {
    loadPlaylist({
      track: playlist[0],
      playlist: playlist,
    });
  };

  return (
    <Button
      border="none"
      borderRadius="full"
      color="secondary.black.800"
      fontSize={isSmall ? "2xl" : "3xl"}
      disabled={disabled}
      onClick={handlePlay}
      px={isSmall ? 0 : 3}
      py={isSmall ? 0 : 7}
      _hover={{ transform: "scale(1.04)" }}
      {...args}
    >
      <BiPlay />
    </Button>
  );
}
