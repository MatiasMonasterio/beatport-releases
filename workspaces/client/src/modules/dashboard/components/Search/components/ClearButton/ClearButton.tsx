import { Button } from "@chakra-ui/react";
import { BiX } from "react-icons/bi";

interface Props {
  onClick: () => void;
}

export default function ClearButton({ onClick }: Props) {
  return (
    <Button
      variant="link"
      color="secondary.gray.500"
      _hover={{ color: "secondary.gray.100" }}
      onClick={onClick}
    >
      <BiX />
    </Button>
  );
}
