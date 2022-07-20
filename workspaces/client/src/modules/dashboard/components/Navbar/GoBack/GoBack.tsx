import { Button } from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";

interface Props {
  onClick: () => void;
}

export default function GoBack({ onClick }: Props) {
  return (
    <Button
      onClick={onClick}
      variant="link"
      fontSize="1.2rem"
      justifyContent="start"
      p={2}
      color="secondary.gray.200"
      _hover={{ color: "secondary.gray.100" }}
    >
      <BiArrowBack />
    </Button>
  );
}
