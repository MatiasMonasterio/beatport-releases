import { Box, Flex } from "@chakra-ui/react";

import { usePlayerContext } from "@/dashboard/contexts/player";
import { usePlayerControls } from "@/dashboard/hooks";

import { Timeline, PlayButton, NextTrackButton, PrevTrackButton } from "../../components";

export default function AudioPlayerDesktop() {
  const { isPlaying } = usePlayerContext();
  const { isFirstTrack, isLastTrack, handlePlay, handleNextTrack, handlePrevTrack } =
    usePlayerControls();

  return (
    <Box display={{ base: "none", sm: "block" }}>
      <Flex justifyContent="center" gap={2} mt="-0.5rem">
        <PrevTrackButton onClick={handlePrevTrack} disabled={isFirstTrack} />
        <PlayButton isPlaying={isPlaying} onClick={handlePlay} />
        <NextTrackButton onClick={handleNextTrack} disabled={isLastTrack} />
      </Flex>

      <Flex gap={4} alignItems="center" display={{ base: "none", sm: "flex" }}>
        <Timeline />
      </Flex>
    </Box>
  );
}
