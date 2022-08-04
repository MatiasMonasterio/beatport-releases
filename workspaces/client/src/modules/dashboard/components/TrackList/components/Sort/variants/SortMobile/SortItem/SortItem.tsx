import { Button, Box } from "@chakra-ui/react";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";

interface Props {
  content: string;
  isActive: boolean;
  isDesc: boolean;
  onClick: () => void;
}

export default function SortItem({ content, isDesc, isActive, onClick }: Props) {
  return (
    <Button
      justifyContent="space-between"
      variant="link"
      color="secondary.gray.500"
      fontWeight="normal"
      onClick={onClick}
    >
      {content}

      {isActive && (
        <Box as="span" color="primary.green" fontSize="xl">
          {isDesc ? <BiDownArrowAlt /> : <BiUpArrowAlt />}
        </Box>
      )}
    </Button>
  );
}
