import { Button } from "@chakra-ui/react";
import { SiBeatport } from "react-icons/si";

interface Props {
  onClick: (() => void) | (() => Promise<void>);
}

export default function BeatportButton({ onClick }: Props) {
  return (
    <Button
      p={1}
      mt={0}
      h="auto"
      minW={0}
      variant="ghost"
      color="gray.500"
      fontSize="md"
      onClick={onClick}
      _hover={{
        color: "white",
      }}
    >
      <SiBeatport />
    </Button>
  );
}
