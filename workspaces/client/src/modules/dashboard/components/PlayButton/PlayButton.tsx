import type { ButtonProps } from "@chakra-ui/react";
import type { Track } from "@br/core";

import { Button } from "@chakra-ui/react";
import { BiPlay } from "react-icons/bi";

import { usePlayerContext } from "@/dashboard/contexts/player";

export interface PlayButtonProps {
  playlist: Track[];
}

export interface Props extends PlayButtonProps, ButtonProps {}

export default function PlayButton({ playlist, ...args }: Props) {
  const { loadPlaylist } = usePlayerContext();

  const handlePlay = () => {
    loadPlaylist({
      track: playlist[0],
      playlist: playlist,
    });
  };

  return (
    <Button variant="play" onClick={handlePlay} {...args} disabled={!playlist.length}>
      <BiPlay />
    </Button>
  );
}
