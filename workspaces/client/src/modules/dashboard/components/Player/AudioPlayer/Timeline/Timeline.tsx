import { useState, useEffect, useMemo } from "react";
import { Box, Text, HStack } from "@chakra-ui/react";

import { secondsToMinutes } from "@/dashboard/utilities";

interface Props {
  currentTime: number;
  duration: number;
  onTimelineChange: (newCurrentTime: number) => void;
}

export default function Timeline({ currentTime, duration, onTimelineChange }: Props) {
  const [progress, setProgress] = useState<number>(0);

  const currentTimeString = useMemo(() => {
    return secondsToMinutes(currentTime);
  }, [progress]);

  const durationString = useMemo(() => {
    return secondsToMinutes(duration);
  }, [progress]);

  const handleInnerCurrentTimeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const playerLineElement = e.currentTarget.getBoundingClientRect();
    const clickPositionFromElement = e.clientX - playerLineElement.left;

    const newProgressValue = clickPositionFromElement / playerLineElement.width;
    const newCurrentTime = newProgressValue * duration;

    onTimelineChange(newCurrentTime);
  };

  useEffect(() => {
    const newCurrentTime = Math.trunc((currentTime / duration) * 100) / 100;
    if (progress !== newCurrentTime) setProgress(newCurrentTime);
  }, [currentTime, duration]);

  return (
    <>
      <Text as="span" fontSize="xs" display={{ base: "none", sm: "initial" }}>
        {currentTimeString}
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

      <Text as="span" fontSize="xs" display={{ base: "none", sm: "initial" }}>
        {durationString}
      </Text>

      <HStack justifyContent="space-between" mb={2} display={{ base: "flex", sm: "none" }}>
        <Text fontSize="xs" as="span" color="gray.400">
          {currentTimeString}
        </Text>
        <Text fontSize="xs" as="span" color="gray.400">
          {durationString}
        </Text>
      </HStack>
    </>
  );
}
