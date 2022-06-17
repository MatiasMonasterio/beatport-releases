import { Button } from "@chakra-ui/react";
import { BiHeart } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";

interface Props {
  isFavorite: boolean;
  onClick: () => void;
}

export default function Favorite({ isFavorite, onClick }: Props) {
  return (
    <Button variant="link" onClick={onClick} fontSize={isFavorite ? "sm" : "md"}>
      {isFavorite ? <FaHeart fill="#01FF95" /> : <BiHeart />}
    </Button>
  );
}
