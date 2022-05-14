import { Text, Flex, Box, Button } from "@chakra-ui/react";
import { BiPlay, BiPause, BiSkipNext, BiSkipPrevious } from "react-icons/bi";

import { usePlayerTimeline } from "hooks";

interface Props {
  duration: number;
  currentTime: number;
  isPlaying: boolean;
  handlePlayTrack: () => void;
  handleChangeCurrentTime: (newCurrentTime: number) => void;
}

export default function AudioPlayer({
  duration,
  currentTime,
  isPlaying,
  handlePlayTrack,
  handleChangeCurrentTime,
}: Props) {
  const playerTimelineArgs = { duration, currentTime };
  const { trackCurrentTime, trackDuration, progress } = usePlayerTimeline(playerTimelineArgs);

  const handleCurrentTimeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const playerLineElement = e.currentTarget.getBoundingClientRect();
    const clickPositionFromElement = e.clientX - playerLineElement.left;

    const newProgressValue = clickPositionFromElement / playerLineElement.width;
    const newCurrentTime = newProgressValue * duration;

    handleChangeCurrentTime(newCurrentTime);
  };

  return (
    <>
      <Flex justifyContent="center" gap={2} mt="-0.8rem">
        <Button variant="link" fontSize="2xl">
          <BiSkipPrevious />
        </Button>

        <Button variant="link" fontSize="5xl" onClick={handlePlayTrack} color="gray.200">
          {isPlaying ? <BiPause /> : <BiPlay />}
        </Button>

        <Button variant="link" fontSize="2xl">
          <BiSkipNext />
        </Button>
      </Flex>
      <Flex gap={4} alignItems="center">
        <Text as="span" fontSize="xs">
          {trackCurrentTime}
        </Text>

        <Box w="100%" py={1} onClick={handleCurrentTimeChange} role="group">
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
        <div onClick={handleCurrentTimeChange}></div>

        <Text as="span" fontSize="xs">
          {trackDuration}
        </Text>
      </Flex>
    </>
  );
}
