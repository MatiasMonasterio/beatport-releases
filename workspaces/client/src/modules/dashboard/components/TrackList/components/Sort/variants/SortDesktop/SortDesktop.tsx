import type { Props } from "../../Sort";
import { tracksFilter } from "types";

import { Grid } from "@chakra-ui/react";
import SortItem from "./SortItem";

const SORT_iTEMS = [
  { content: "title", filter: tracksFilter.name },
  { content: "genre", filter: tracksFilter.genre },
  { content: "bpm", filter: tracksFilter.bpm },
];

export default function SortDesktop({ filter, isDesc, favoritesList, onSortBy }: Props) {
  return (
    <Grid
      display={{ base: "none", sm: "grid" }}
      templateColumns="minmax(314px, 1fr) minmax(150px, 290px) minmax(30px, 100px) minmax(50px, 120px) 60px"
      gap={6}
      fontSize="xs"
    >
      {SORT_iTEMS.map((item) => (
        <SortItem
          key={item.content}
          content={item.content}
          isDesc={isDesc}
          isActive={filter === item.filter}
          onClick={() => onSortBy(item.filter)}
        />
      ))}

      {favoritesList ? (
        <SortItem
          content="Incorporation"
          isDesc={isDesc}
          isActive={filter === tracksFilter.createdAt}
          onClick={() => onSortBy(tracksFilter.createdAt)}
        />
      ) : (
        <SortItem
          content="Released"
          isDesc={isDesc}
          isActive={filter === tracksFilter.released}
          onClick={() => onSortBy(tracksFilter.released)}
        />
      )}
    </Grid>
  );
}
