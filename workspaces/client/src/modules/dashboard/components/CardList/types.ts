import type { Artist, Label } from "@br/core";

export type Type = "artist" | "label";
export type Size = "sm" | "md";
export type CardData = Artist | Label;
export type CardListData = Artist[] | Label[];
