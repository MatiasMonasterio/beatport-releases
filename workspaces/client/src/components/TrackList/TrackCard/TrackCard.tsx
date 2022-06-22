import type { Track } from "@br/core";

interface ITrack extends Track {
  createdAt: number;
}

import { useState, Suspense, useMemo } from "react";
import { Link as ReactLink } from "react-router-dom";
import { Box, Text, Image, Grid, GridItem, Link, HStack, Button } from "@chakra-ui/react";

import { Favorite } from "components";
import { usePlayerContext } from "context/player";
import { getDiffDays } from "utils";

import LoadingBg from "./LoadingBg";

interface Props {
  favoritesList?: boolean;
  track: Track;
  handlePlayTrack: (track: Track) => void;
}

export default function TrackCard({ favoritesList, track, handlePlayTrack }: Props): JSX.Element {
  const { id, name, artwork, artists, label, genres, released, bpm, mix } = track;
  const { createdAt } = track as ITrack;

  const [isLoading] = useState<boolean>(false);
  const { currentTrack } = usePlayerContext();

  const daysPassed: number = useMemo(() => {
    return getDiffDays(released);
  }, []);

  const isSelect = useMemo(() => {
    return currentTrack.id === id;
  }, [currentTrack]);

  const publishDate: string = useMemo(() => {
    if (daysPassed === 0) return "Today";
    if (daysPassed === 1) return `${daysPassed} day ago`;
    if (daysPassed > 0) return `${daysPassed} days ago`;

    return new Intl.DateTimeFormat("es-ES").format(new Date(released));
  }, []);

  const favoriteDate: string = useMemo(() => {
    const daysFromCreated = getDiffDays(createdAt);

    if (daysFromCreated === 0) return "Today";
    if (daysFromCreated === 1) return `${daysFromCreated} day ago`;
    if (daysFromCreated > 0) return `${daysFromCreated} days ago`;

    return new Intl.DateTimeFormat("es-ES").format(new Date(released));
  }, []);

  const handleShowBeatport = (): void => {
    handlePlayTrack(track);
  };

  return (
    <Box
      _hover={{ bgColor: "gray.700" }}
      borderRadius="sm"
      overflow="hidden"
      transition="background-color 0.1s"
    >
      <Grid
        templateColumns={{
          base: "90px 1fr",
          sm: "90px minmax(200px, 1fr) minmax(150px, 290px) minmax(30px, 100px) minmax(50px, 120px) 60px",
        }}
        gap={6}
      >
        <GridItem mb="auto" pos="relative">
          <Button variant="link" d="block">
            <Image src={artwork} boxSize={20} onClick={handleShowBeatport} loading="lazy" />

            {isLoading && (
              <Suspense fallback={null}>
                <LoadingBg />
              </Suspense>
            )}
          </Button>
        </GridItem>
        <GridItem
          display="flex"
          flexDirection="column"
          gap={0.2}
          alignItems="start"
          alignSelf="center"
          overflow="hidden"
        >
          <Box color={isSelect ? "#01FF95" : ""} w="100%">
            <Text
              as="span"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              overflow="hidden"
              width="100%"
              display="inline-block"
            >
              {name} {mix}
            </Text>{" "}
          </Box>

          <HStack fontSize="sm" color="gray.400" spacing={1}>
            {artists.map((artist) => (
              <Link
                as={ReactLink}
                key={artist.id}
                to={`/artist/${artist.id}`}
                _notLast={{ _after: { content: `", "` } }}
              >
                {artist.name}
              </Link>
            ))}
          </HStack>

          <Link as={ReactLink} to={`/label/${label.id}`} fontSize="sm" color="gray.400">
            {label.name}
          </Link>
        </GridItem>

        <GridItem
          py={{ base: 0, sm: 2 }}
          fontSize="sm"
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
        >
          {bpm}
        </GridItem>

        <GridItem
          py={{ base: 0, sm: 2 }}
          fontSize="sm"
          display={{ base: "none", sm: "block" }}
          alignSelf="center"
        >
          {favoritesList ? favoriteDate : publishDate}
        </GridItem>

        <Favorite track={track} />
      </Grid>
    </Box>
  );
}
