import { Button } from "@chakra-ui/react";
import { SiYoutube } from "react-icons/si";

interface Props {
  onClick: (() => void) | (() => Promise<void>);
}

export default function YoutubeButton({ onClick }: Props) {
  return (
    <Button
      p={1}
      mt={0}
      h="auto"
      fontSize="lg"
      minW={0}
      variant="ghost"
      color="gray.500"
      _hover={{
        color: "white",
      }}
      onClick={onClick}
    >
      <SiYoutube />
    </Button>
  );
}
