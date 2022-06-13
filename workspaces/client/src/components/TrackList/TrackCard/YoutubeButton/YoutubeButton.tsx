import { Button } from "@chakra-ui/react";
import { SiYoutube } from "react-icons/si";

interface Props {
  onClick: (() => void) | (() => Promise<void>);
  disabled: boolean;
}

export default function YoutubeButton({ onClick, disabled }: Props) {
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
      disabled={disabled}
      onClick={onClick}
    >
      <SiYoutube />
    </Button>
  );
}
