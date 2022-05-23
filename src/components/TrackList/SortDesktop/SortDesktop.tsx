import { trackFilter } from "../TrackList";

import { Grid, GridItem } from "@chakra-ui/react";

import SortItem from "./SortItem";

interface Props {
  filter: string;
  isDesc: boolean;
  sortTitle: () => void;
  sortGenre: () => void;
  sortBpm: () => void;
  sortReleased: () => void;
}

export default function SortDesktop({
  filter,
  isDesc,
  sortTitle,
  sortGenre,
  sortBpm,
  sortReleased,
}: Props) {
  return (
    <Grid
      display={{ base: "none", sm: "grid" }}
      templateColumns="minmax(314px, 1fr) minmax(150px, 250px) minmax(30px, 100px) minmax(80px, 150px)"
      gap={6}
      color="gray.400"
      fontSize="xs"
    >
      <GridItem>
        <SortItem
          content="Title"
          isDesc={isDesc}
          isActive={filter === trackFilter.name}
          onClick={sortTitle}
        />
      </GridItem>
      <GridItem>
        <SortItem
          content="genre"
          isDesc={isDesc}
          isActive={filter === trackFilter.genres}
          onClick={sortGenre}
        />
      </GridItem>
      <GridItem>
        <SortItem
          content="Bpm"
          isDesc={isDesc}
          isActive={filter === trackFilter.bpm}
          onClick={sortBpm}
        />
      </GridItem>
      <GridItem>
        <SortItem
          content="Released"
          isDesc={isDesc}
          isActive={filter === trackFilter.released}
          onClick={sortReleased}
        />
      </GridItem>
    </Grid>
  );
}
