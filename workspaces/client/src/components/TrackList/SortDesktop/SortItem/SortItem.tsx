import { Button, Box } from "@chakra-ui/react";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";

interface Props {
  content: string;
  isActive: boolean;
  isDesc: boolean;
  onClick: () => void;
}

export default function SortItem({ content, isActive, isDesc, onClick }: Props) {
  return (
    <Button
      variant="link"
      fontSize="inherit"
      onClick={onClick}
      justifyContent="start"
      gap={2}
      textTransform="uppercase"
      _active={{ color: "gray.200" }}
      _hover={{
        textDecoration: "none",
        color: "gray.200",
      }}
    >
      {content}
      {isActive && (
        <Box as="span" color="#01FF95">
          {isDesc ? <BiCaretDown /> : <BiCaretUp />}
        </Box>
      )}
    </Button>
  );
}
