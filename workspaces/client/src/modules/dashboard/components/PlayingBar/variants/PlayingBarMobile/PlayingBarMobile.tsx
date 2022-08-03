import { Flex, Box } from "@chakra-ui/react";

import { usePlayerContext } from "@/dashboard/contexts/player";
import { TrackCardFooter, Favorite, PlayerControls } from "@/dashboard/components";

export default function PlayingBarMobile() {
  const { currentTrack } = usePlayerContext();

  return (
    <Flex>
      <Box mr="auto">
        <TrackCardFooter track={currentTrack} />
      </Box>

      <Box position="relative" zIndex={100} alignSelf="center">
        <Favorite track={currentTrack} />
      </Box>

      <PlayerControls />
    </Flex>
  );
}
