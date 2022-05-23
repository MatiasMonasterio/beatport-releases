import { Button } from "@chakra-ui/react";
import { BiPause, BiPlay } from "react-icons/bi";

interface Props {
  isPlaying: boolean;
  onClick: () => void;
}

export default function PlayButton({ isPlaying, onClick }: Props) {
  return (
    <Button
      variant="link"
      _hover={{ color: "white" }}
      _active={{ transform: "scale(0.9)" }}
      fontSize="5xl"
      onClick={onClick}
      color="gray.200"
    >
      {isPlaying ? <BiPause /> : <BiPlay />}
    </Button>
  );
}
