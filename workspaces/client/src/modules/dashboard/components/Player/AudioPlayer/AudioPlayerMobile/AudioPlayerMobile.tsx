import { useRef, useState, lazy, Suspense } from "react";
import { Box, Container } from "@chakra-ui/react";

import { usePlayerContext } from "@/dashboard/contexts/player";
import { useAudioControls } from "@/dashboard/hooks";

import PlayButton from "../PlayButton";
const TrackView = lazy(() => import("./TrackView"));

export default function AudioPlayerMobile() {
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const [showView, setShowView] = useState<boolean>(false);

  const { isPlaying } = usePlayerContext();
  const { handlePlay, handleTimelineChange, handleNextTrack, handlePrevTrack } = useAudioControls();

  const handleShowPlayer = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === playerContainerRef.current) {
      setShowView(true);
    }
  };

  const handleClosePlayer = () => {
    setShowView(false);
  };

  return (
    <>
      <Box
        position="absolute"
        left={0}
        top={0}
        width="100%"
        height="100%"
        justifyContent="end"
        onClick={handleShowPlayer}
      >
        <Container
          display="flex"
          justifyContent="end"
          alignItems="center"
          height="100%"
          ref={playerContainerRef}
        >
          <PlayButton isPlaying={isPlaying} onClick={handlePlay} />
        </Container>
      </Box>

      <Suspense fallback={null}>
        <TrackView
          isVisible={showView}
          onPlay={handlePlay}
          onNextTrack={handleNextTrack}
          onPrevTrack={handlePrevTrack}
          onTimelineChange={handleTimelineChange}
          onCloseView={handleClosePlayer}
        />
      </Suspense>
    </>
  );
}
