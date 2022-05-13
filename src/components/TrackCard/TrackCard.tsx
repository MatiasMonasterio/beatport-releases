import type { Track } from "types";

import { useState, Suspense, useMemo } from "react";
import { Link as ReactLink } from "react-router-dom";
import { Box, Text, Image, Grid, GridItem, Link, HStack } from "@chakra-ui/react";

import { useWidget } from "context/widget";
import { getYoutubeVideoId } from "services/widget";
import { getDiffDays } from "utils";

import YoutubeButton from "./YoutubeButton";
import BeatportButton from "./BeatportButton";
import SpotifyButton from "./SpotifyButton";
import LoadingBg from "./LoadingBg";

export default function TrackCard(props: Track): JSX.Element {
  const { name, artwork, artists, label, genres, released, bpm, mix } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showYoutubeWidget, showBeatportWidget } = useWidget();

  const daysPassed: number = useMemo(() => {
    return getDiffDays(released);
  }, []);

  const publishDate: string = useMemo(() => {
    if (daysPassed === 0) return "Today";
    if (daysPassed > 0) return `${daysPassed} days ago`;

    return new Intl.DateTimeFormat("es-ES").format(new Date(released));
  }, []);

  const handleShowYoutubeWidget = async (): Promise<void> => {
    setIsLoading(true);

    const videoId = await getYoutubeVideoId(`${name} ${artists[0].name}`);
    videoId && showYoutubeWidget(videoId);

    setIsLoading(false);
  };

  const handleShowBeatport = (): void => {
    showBeatportWidget(props);
  };

  return (
    <Box
      _hover={{ bgColor: "gray.700" }}
      borderRadius="sm"
      overflow="hidden"
      transition="background-color 0.1s"
    >
      <Grid templateColumns="90px 1fr 250px 100px 150px" gap={6}>
        <GridItem mb="auto" pos="relative">
          <Image src={artwork} boxSize={24} />

          {isLoading && (
            <Suspense fallback={null}>
              <LoadingBg />
            </Suspense>
          )}
        </GridItem>
        <GridItem py={2}>
          <Text>
            {name} {mix} [
            <Link as={ReactLink} to={`/labels/${label.id}`}>
              {label.name}
            </Link>
            ]
          </Text>

          <HStack fontSize="sm" color="gray.400" spacing={1} mb={2}>
            {artists.map((artist) => (
              <Link as={ReactLink} key={artist.id} to={`/artists/${artist.id}`}>
                {artist.name},
              </Link>
            ))}
          </HStack>

          <HStack spacing={1} alignItems="center">
            <BeatportButton onClick={handleShowBeatport} />
            <SpotifyButton onClick={handleShowBeatport} disabled={daysPassed < 0} />
            <YoutubeButton onClick={handleShowYoutubeWidget} disabled={daysPassed < 0} />
          </HStack>
        </GridItem>

        <GridItem py={2} fontSize="sm">
          {genres.map((genre, index) => (
            <Text key={index}>{genre.name}</Text>
          ))}
        </GridItem>

        <GridItem fontSize="sm" py={2}>
          {bpm}
        </GridItem>

        <GridItem py={2} fontSize="sm">
          {publishDate}
        </GridItem>
      </Grid>
    </Box>
  );
}
