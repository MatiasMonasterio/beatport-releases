import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { VStack, Container, HStack, Box, Button } from "@chakra-ui/react";
import { BiChevronDown } from "react-icons/bi";

import { TrackCardView, Favorite } from "@/dashboard/components";
import { usePlayerControls } from "@/dashboard/hooks";
import { usePlayerContext } from "@/dashboard/contexts/player";

import Timeline from "../Timeline";
import PlayButton from "../PlayButton";
import NextTrackButton from "../NextTrackButton";
import PrevTrackButton from "../PrevTrackButton";

interface Props {
  isVisible: boolean;
  onCloseView: () => void;
}

export default function TrackView({ isVisible, onCloseView }: Props) {
  const { isPlaying, currentTrack } = usePlayerContext();
  const { isFirstTrack, isLastTrack, handlePlay, handleNextTrack, handlePrevTrack } =
    usePlayerControls();

  const handleCloseView = () => {
    onCloseView();
  };

  const location = useLocation();

  useEffect(() => {
    isVisible && onCloseView();
  }, [location]);

  return (
    <VStack
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="100%"
      bgGradient="linear(to-t, secondary.black.900, secondary.black.800)"
      zIndex={101}
      transition="transform 0.2s"
      transitionDelay="0.1s"
      transform={!isVisible ? "translateY(100%)" : ""}
      py={10}
    >
      <Container width="100%">
        <Button variant="link" fontSize="4xl" onClick={handleCloseView}>
          <BiChevronDown />
        </Button>
      </Container>

      <Container display="flex" flexDirection="column" height="100%">
        <TrackCardView track={currentTrack} />

        <Box py={5}>
          <Timeline />

          <HStack justifyContent="space-between" gap={2}>
            <Box>
              <Favorite track={currentTrack} />
            </Box>

            <HStack>
              <PrevTrackButton onClick={handlePrevTrack} disabled={isFirstTrack} />
              <PlayButton onClick={handlePlay} isPlaying={isPlaying} />
              <NextTrackButton onClick={handleNextTrack} disabled={isLastTrack} />
            </HStack>

            <Box> {"  "} </Box>
          </HStack>
        </Box>
      </Container>
    </VStack>
  );
}
