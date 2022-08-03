import { GridItem, Flex } from "@chakra-ui/react";

import { usePlayerContext } from "@/dashboard/contexts/player";
import { TrackCardFooter, PlayerControls, Favorite } from "@/dashboard/components";

export default function PlayinBarDesktop() {
  const { currentTrack } = usePlayerContext();

  return (
    <>
      <Flex>
        <TrackCardFooter track={currentTrack} />
        <Favorite track={currentTrack} />
      </Flex>

      <PlayerControls />

      <GridItem display={{ base: "none", sm: "flex" }} justifyContent="center" />
    </>
  );
}
