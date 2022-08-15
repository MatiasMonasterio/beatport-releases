import type { Type, CardListData, Size } from "./types";

import { Grid } from "@chakra-ui/react";

import { CardLoader } from "@/dashboard/components";

import Card from "./Card";
import AddCard from "./AddCard";

interface Props {
  isLoading: boolean;
  datas: CardListData;
  size: Size;
  type: Type;
  onNew: (id: string) => Promise<void>;
}

const SIZE_VALUES = {
  sm: 170,
  md: 200,
};

export default function CardList({ datas, size, type, isLoading, onNew }: Props) {
  return (
    <Grid
      templateColumns={{
        base: "repeat(auto-fill, minmax(50px, 1fr))",
        sm: `repeat(auto-fill, minmax(${SIZE_VALUES[size]}px, 1fr))`,
      }}
      overflow="hidden"
      gap={size === "sm" ? 2 : 3}
    >
      {!isLoading && <AddCard height={SIZE_VALUES[size]} type={type} onNewCard={onNew} />}

      {datas.map((data) => (
        <Card data={data} type={type} height={SIZE_VALUES[size]} key={data.id} />
      ))}

      {isLoading && [1, 2, 3, 4, 5, 6, 7].map((value) => <CardLoader key={value} height={170} />)}
    </Grid>
  );
}
