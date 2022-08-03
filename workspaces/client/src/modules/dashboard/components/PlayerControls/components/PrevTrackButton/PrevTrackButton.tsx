import { Button } from "@chakra-ui/react";
import { BiSkipPrevious } from "react-icons/bi";

interface Props {
  disabled: boolean;
  onClick: () => void;
}

export default function PrevTrackButton({ onClick, disabled = false }: Props) {
  return (
    <Button
      variant="link"
      _hover={{ color: "secondary.gray.100" }}
      fontSize="2xl"
      onClick={onClick}
      disabled={disabled}
      color="secondary.gray.200"
    >
      <BiSkipPrevious />
    </Button>
  );
}
