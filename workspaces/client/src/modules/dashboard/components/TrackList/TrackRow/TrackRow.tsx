import type { Track } from "@br/core";

export interface ITrack extends Track {
  createdAt: number;
}

import { useMemo } from "react";
import { Link as ReactLink } from "react-router-dom";
import { Box, Text, Grid, GridItem, Link, Heading } from "@chakra-ui/react";

import { Favorite } from "@/dashboard/components";
import { usePlayerContext } from "@/dashboard/contexts/player";

import ArtistLink from "./ArtistLink";
import PublishedDate from "./PublishedDate";
import FavoriteDate from "./FavoriteDate";
import ImageButton from "./ImageButton";

export interface Props {
  isFavoriteList?: boolean;
  track: Track;
  onPlay: (track: Track) => void;
}

export default function TrackRow({ isFavoriteList, track, onPlay }: Props): JSX.Element {
  const { id, name, artists, label, genres, released, bpm, mix } = track;
  const { createdAt } = track as ITrack;

  const { currentTrack } = usePlayerContext();

  const isSelect = useMemo(() => {
    return currentTrack ? currentTrack.id === id : false;
  }, [currentTrack]);

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
          base: "90px 1fr",
          sm: "90px minmax(200px, 1fr) minmax(150px, 290px) minmax(30px, 100px) minmax(50px, 120px) 60px",
        }}
        gap={6}
      >
        <GridItem mb="auto" pos="relative">
          <ImageButton track={track} onClick={handlePlayTrack} />
        </GridItem>

        <GridItem gap={0.2} display="flex" flexDir="column" alignItems="start">
          <Heading
            size="sm"
            as="h3"
            fontWeight="normal"
            color={isSelect ? "primary.green" : "secondary.gray.200"}
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
            width="100%"
            display="inline-block"
          >
            {name} {mix}
          </Heading>

          <Box
            fontSize="sm"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
            width="100%"
            display="inline-block"
          >
            {artists.map((artist) => (
              <ArtistLink artist={artist} key={artist.id} />
            ))}
          </Box>

          <Link as={ReactLink} to={`/label/${label.id}`} fontSize="sm">
            {label.name}
          </Link>
        </GridItem>

        <GridItem
          py={{ base: 0, sm: 2 }}
          fontSize="sm"
          color="secondary.gray.700"
          display={{ base: "none", sm: "block" }}
          alignSelf="center"
        >
          {genres.map((genre) => (
            <Text key={genre.id}>{genre.name}</Text>
          ))}
        </GridItem>

        <GridItem
          fontSize="sm"
          py={{ base: 0, sm: 2 }}
          display={{ base: "none", sm: "block" }}
          alignSelf="center"
          color="secondary.gray.700"
        >
          {bpm}
        </GridItem>

        <GridItem
          py={{ base: 0, sm: 2 }}
          fontSize="sm"
          display={{ base: "none", sm: "block" }}
          alignSelf="center"
          color="secondary.gray.700"
        >
          {isFavoriteList && <FavoriteDate createdAt={createdAt} />}
          {!isFavoriteList && <PublishedDate released={released} />}
        </GridItem>

        <Favorite track={track} />
      </Grid>
    </Box>
  );
}
