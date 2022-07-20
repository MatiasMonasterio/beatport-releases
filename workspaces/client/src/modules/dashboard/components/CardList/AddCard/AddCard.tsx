import type { Type } from "../types";

import { Box, Heading, Text, Button, Center, useDisclosure } from "@chakra-ui/react";
import { BiPlus } from "react-icons/bi";

import DialogForm from "./DialogForm";

interface Props {
  height: number;
  type: Type;
  onNewCard: (id: string) => Promise<void>;
}

export default function AddCard({ height, type, onNewCard }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <DialogForm isOpen={isOpen} onClose={onClose} onNewCard={onNewCard} type={type} />

      <Button
        flexDir="column"
        gap={2}
        role="group"
        variant="link"
        w="100%"
        _hover={{ textDecoration: "none" }}
        onClick={onOpen}
      >
        <Center
          height={height}
          w="100%"
          borderRadius="lg"
          overflow="hidden"
          color="secondary.gray.200"
          position="relative"
          fontSize="7xl"
          _groupHover={{
            _after: { bgColor: "blackAlpha.500" },
          }}
          _after={{
            content: `""`,
            display: "block",
            position: "absolute",
            width: "100%",
            height: "100%",
            bgColor: "blackAlpha.600",
            transition: "background-color .1s",
            left: 0,
            top: 0,
          }}
        >
          <BiPlus />
        </Center>

        <Box w="100%" textAlign="left">
          <Heading as="h2" size="sm">
            Add new
          </Heading>

          <Text fontSize="xs" textTransform="capitalize">
            {type}
          </Text>
        </Box>
      </Button>
    </>
  );
}
