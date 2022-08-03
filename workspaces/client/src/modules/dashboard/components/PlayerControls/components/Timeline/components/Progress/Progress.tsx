import { Box } from "@chakra-ui/react";

interface Props {
  progress: number;
  duration: number;
  onChange: (progress: number) => void;
}

export default function Progress({ progress, duration, onChange }: Props) {
  const handleInnerCurrentTimeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const playerLineElement = e.currentTarget.getBoundingClientRect();
    const clickPositionFromElement = e.clientX - playerLineElement.left;

    const newProgressValue = clickPositionFromElement / playerLineElement.width;
    const newCurrentTime = newProgressValue * duration;

    onChange(newCurrentTime);
  };

  return (
    <Box w="100%" py={1} onClick={handleInnerCurrentTimeChange} role="group" cursor="pointer">
      <Box
        h="3px"
        w="100%"
        backgroundColor="secondary.black.500"
        position="relative"
        _after={{
          content: `""`,
          display: "block",
          height: "100%",
          width: progress,
          bgColor: "secondary.gray.200",
        }}
        _before={{
          content: `""`,
          display: "none",
          position: "absolute",
          boxShadow: "md",
          borderRadius: "full",
          width: 3,
          height: 3,
          bgColor: "secondary.gray.100",
          top: "-130%",
          left: `calc(${progress}*99%)`,
        }}
        _groupHover={{
          _after: { bgColor: "primary.green" },
          _before: { display: "block" },
        }}
      />
    </Box>
  );
}
