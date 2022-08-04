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
      color="secondary.gray.700"
      gap={2}
      textTransform="uppercase"
      _active={{ color: "secondary.gray.200" }}
      _hover={{
        textDecoration: "none",
        color: "secondary.gray.200",
      }}
    >
      {content}
      {isActive && (
        <Box as="span" color="primary.green">
          {isDesc ? <BiCaretDown /> : <BiCaretUp />}
        </Box>
      )}
    </Button>
  );
}
