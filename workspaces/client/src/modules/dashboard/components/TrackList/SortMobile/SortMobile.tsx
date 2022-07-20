import { trackFilter } from "../TrackList";

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

interface Props {
  filter: string;
  isDesc: boolean;
  sortTitle: () => void;
  sortGenre: () => void;
  sortBpm: () => void;
  sortReleased: () => void;
}

export default function SortMobile({
  isDesc,
  sortTitle,
  filter,
  sortGenre,
  sortBpm,
  sortReleased,
}: Props) {
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
                sortTitle();
                onClose();
              }}
              content="Title"
              isDesc={isDesc}
              isActive={filter === trackFilter.name}
            />

            <SortItem
              onClick={() => {
                sortGenre();
                onClose();
              }}
              content="Genre"
              isDesc={isDesc}
              isActive={filter === trackFilter.genres}
            />

            <SortItem
              onClick={() => {
                sortBpm();
                onClose();
              }}
              content="Bpm"
              isDesc={isDesc}
              isActive={filter === trackFilter.bpm}
            />

            <SortItem
              onClick={() => {
                sortReleased();
                onClose();
              }}
              content="Released"
              isDesc={isDesc}
              isActive={filter === trackFilter.released}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
