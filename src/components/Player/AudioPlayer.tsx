import { useEffect } from "react";

import { Text, Flex, Box, Button } from "@chakra-ui/react";
import { BiPlay, BiPause, BiSkipNext, BiSkipPrevious } from "react-icons/bi";

import { usePlayerTimeline, usePlayer } from "hooks";

interface Props {
  source: string;
  audioRef: React.RefObject<HTMLAudioElement>;
  handleNextTrack: () => void;
  hadnlePrevTrack: () => void;
}

export default function AudioPlayer({ source, audioRef, handleNextTrack, hadnlePrevTrack }: Props) {
  const { duration, currentTime, isPlaying } = usePlayer(audioRef);
  const playerTimelineArgs = { duration, currentTime };
  const { trackCurrentTime, trackDuration, progress } = usePlayerTimeline(playerTimelineArgs);

  const handleInnerCurrentTimeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const playerLineElement = e.currentTarget.getBoundingClientRect();
    const clickPositionFromElement = e.clientX - playerLineElement.left;

    const newProgressValue = clickPositionFromElement / playerLineElement.width;
    const newCurrentTime = newProgressValue * duration;

    if (audioRef.current) audioRef.current.currentTime = newCurrentTime;
  };

  const handlePlay = (): void => {
    const isPaused = audioRef.current?.paused;

    if (isPaused) audioRef.current?.play();
    else audioRef.current?.pause();
  };

  useEffect(() => {
    audioRef.current?.pause();
  }, []);

  return (
    <>
      <Flex justifyContent="center" gap={2} mt="-0.8rem">
        <Button variant="link" _hover={{ color: "white" }} fontSize="2xl" onClick={hadnlePrevTrack}>
          <BiSkipPrevious />
        </Button>

        <Button
          variant="link"
          _hover={{ color: "white" }}
          _active={{ transform: "scale(0.9)" }}
          fontSize="5xl"
          onClick={handlePlay}
          color="gray.200"
        >
          {isPlaying ? <BiPause /> : <BiPlay />}
        </Button>

        <Button variant="link" _hover={{ color: "white" }} fontSize="2xl" onClick={handleNextTrack}>
          <BiSkipNext />
        </Button>
      </Flex>
      <Flex gap={4} alignItems="center">
        <Text as="span" fontSize="xs">
          {trackCurrentTime}
        </Text>

        <Box w="100%" py={1} onClick={handleInnerCurrentTimeChange} role="group">
          <Box
            h="3px"
            w="100%"
            bg="gray.700"
            _after={{
              content: `""`,
              display: "block",
              height: "100%",
              width: progress,
              bg: "gray.100",
            }}
            _groupHover={{
              _after: { bg: "#01FF95" },
            }}
          />
        </Box>

        <Text as="span" fontSize="xs">
          {trackDuration}
        </Text>
      </Flex>

      <audio autoPlay ref={audioRef} src={source} />
    </>
  );
}
