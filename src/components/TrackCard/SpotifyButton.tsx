import { Button } from "@chakra-ui/react";
import { SiSpotify } from "react-icons/si";

interface Props {
  onClick: (() => void) | (() => Promise<void>);
}

export default function SpotifyButton({ onClick }: Props): JSX.Element {
  return (
    <Button
      p={0.5}
      mt={0}
      h="auto"
      fontSize="md"
      minW={0}
      variant="ghost"
      color="gray.500"
      _hover={{
        color: "white",
      }}
      onClick={onClick}
    >
      <SiSpotify />
    </Button>
  );
}
