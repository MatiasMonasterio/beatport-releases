import type { Track } from "@br/core";

export interface ITrack extends Track {
  createdAt: number;
}

import { Box, Grid, GridItem } from "@chakra-ui/react";

import { Favorite, TrackCardRow } from "@/dashboard/components";
import { dateFromNow } from "@/dashboard/utilities";

import { TrackRowItem } from "./components";

export interface Props {
  isFavoriteList?: boolean;
  track: Track;
  onPlay: (track: Track) => void;
}

export default function TrackRow({ isFavoriteList, track, onPlay }: Props): JSX.Element {
  const { genres, released, bpm } = track;
  const { createdAt } = track as ITrack;

  const handlePlayTrack = () => {
    onPlay(track);
  };

  return (
    <Box
      _hover={{ bgColor: "secondary.black.700" }}
      borderRadius="sm"
      overflow="hidden"
      transition="background-color 0.1s"
      role="listitem"
    >
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "minmax(290px, 1fr) minmax(150px, 290px) minmax(30px, 100px) minmax(50px, 120px) 60px",
        }}
        gap={6}
      >
        <TrackCardRow track={track} onPlay={handlePlayTrack} />
        <TrackRowItem content={genres[0].name} />
        <TrackRowItem content={bpm} />
        <TrackRowItem content={isFavoriteList ? dateFromNow(createdAt) : dateFromNow(released)} />

        <GridItem display={{ base: "none", sm: "flex" }} alignSelf="center" justifyContent="center">
          <Favorite track={track} />
        </GridItem>
      </Grid>
    </Box>
  );
}
