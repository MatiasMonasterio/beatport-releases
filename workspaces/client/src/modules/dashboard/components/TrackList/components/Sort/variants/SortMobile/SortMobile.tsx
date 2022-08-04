import type { Props } from "../../Sort";
import { tracksFilter } from "types";

import {
  HStack,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
} from "@chakra-ui/react";
import { BiSortAlt2 } from "react-icons/bi";

import SortItem from "./SortItem";

export default function SortMobile({ isDesc, filter, onSortBy }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <HStack justifyContent="end" position="absolute" bottom="15px" right={0}>
        <Button variant="link" fontSize="xl" onClick={onOpen}>
          <BiSortAlt2 />
        </Button>
      </HStack>

      <Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
        <DrawerOverlay />

        <DrawerContent backgroundColor="secondary.black.800" py={4}>
          <DrawerHeader
            py={0}
            mb={2}
            fontWeight="semibold"
            fontSize="md"
            color="secondary.gray.100"
          >
            Sort by
          </DrawerHeader>

          <DrawerBody display="flex" flexDirection="column" gap={5}>
            <SortItem
              onClick={() => {
                onSortBy(tracksFilter.name);
                onClose();
              }}
              content="Title"
              isDesc={isDesc}
              isActive={filter === tracksFilter.name}
            />

            <SortItem
              onClick={() => {
                onSortBy(tracksFilter.genre);
                onClose();
              }}
              content="Genre"
              isDesc={isDesc}
              isActive={filter === tracksFilter.genre}
            />

            <SortItem
              onClick={() => {
                onSortBy(tracksFilter.bpm);
                onClose();
              }}
              content="Bpm"
              isDesc={isDesc}
              isActive={filter === tracksFilter.bpm}
            />

            <SortItem
              onClick={() => {
                onSortBy(tracksFilter.released);
                onClose();
              }}
              content="Released"
              isDesc={isDesc}
              isActive={filter === tracksFilter.released}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
