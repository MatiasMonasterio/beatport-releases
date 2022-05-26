import { Flex } from "@chakra-ui/react";

import { usePlayerContext } from "context/player";
import { usePlayer, useAudioControls } from "hooks";

import Timeline from "../Timeline";
import PlayButton from "../PlayButton";
import NextTrackButon from "../NextTrackButton";
import PrevTrackButton from "../PrevTrackButton";

export default function AudioPlayerDesktop() {
  const { audioRef, isPlaying } = usePlayerContext();
  const {
    isFirstTrack,
    isLastTrack,
    handlePlay,
    handleTimelineChange,
    handleNextTrack,
    handlePrevTrack,
  } = useAudioControls();

  const { duration, currentTime } = usePlayer(audioRef);

  return (
    <>
      <Flex justifyContent="center" gap={2} mt="-0.5rem">
        <PrevTrackButton onClick={handlePrevTrack} disabled={isFirstTrack} />
        <PlayButton isPlaying={isPlaying} onClick={handlePlay} />
        <NextTrackButon onClick={handleNextTrack} disabled={isLastTrack} />
      </Flex>

      <Flex gap={4} alignItems="center" display={{ base: "none", sm: "flex" }}>
        <Timeline
          currentTime={currentTime}
          duration={duration}
          onTimelineChange={handleTimelineChange}
        />
      </Flex>
    </>
  );
}
