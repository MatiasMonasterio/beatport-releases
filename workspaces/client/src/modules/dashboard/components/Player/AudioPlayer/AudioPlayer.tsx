import { Box } from "@chakra-ui/react";

import { usePlayerContext } from "@/dashboard/contexts/player";

import AudioPlayerDesktop from "./AudioPlayerDesktop";
import AudioPlayerMobile from "./AudioPlayerMobile";

export default function AudioPlayer() {
  const { currentTrack, audioRef } = usePlayerContext();

  return (
    <>
      <Box display={{ base: "none", sm: "block" }}>
        <AudioPlayerDesktop />
      </Box>

      <Box display={{ base: "block", sm: "none" }}>
        <AudioPlayerMobile />
      </Box>

      <audio ref={audioRef} src={currentTrack.preview} />
    </>
  );
}
