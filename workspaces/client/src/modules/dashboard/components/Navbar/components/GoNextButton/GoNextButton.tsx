import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";

export default function GoNextButton() {
  const navigate = useNavigate();
  const handleNavigateNext = () => navigate(1);

  return (
    <Button
      onClick={handleNavigateNext}
      transform="rotate(180deg)"
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
