import { Text, HStack } from "@chakra-ui/react";

import { usePlayerControls, usePlayerTime } from "@/dashboard/hooks";

import { Progress } from "./components";
import { useTimeStrings, useProgress } from "./hooks";

export default function Timeline() {
  const { handleTimelineChange } = usePlayerControls();
  const { duration, currentTime } = usePlayerTime();

  const { progress } = useProgress({ duration, currentTime });
  const { currentTimeString, durationString } = useTimeStrings({ duration, currentTime, progress });

  const handleProgressChange = (newCurrentTime: number) => {
    handleTimelineChange(newCurrentTime);
  };

  return (
    <>
      <Text as="span" fontSize="xs" display={{ base: "none", sm: "initial" }}>
        {currentTimeString}
      </Text>

      <Progress progress={progress} duration={duration} onChange={handleProgressChange} />

      <Text as="span" fontSize="xs" display={{ base: "none", sm: "initial" }}>
        {durationString}
      </Text>

      <HStack justifyContent="space-between" mb={2} display={{ base: "flex", sm: "none" }}>
        <Text fontSize="xs" as="span">
          {currentTimeString}
        </Text>
        <Text fontSize="xs" as="span">
          {durationString}
        </Text>
      </HStack>
    </>
  );
}
