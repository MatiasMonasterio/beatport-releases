import type { Track, Artist, Label } from "@br/core";

import { useState, useEffect } from "react";
import { Link as ReactLink } from "react-router-dom";
import { Container, Heading, VStack, Box, Grid, HStack, Link } from "@chakra-ui/react";

import { MetaTags, TrackList, FeedCard, CardList } from "components";
import { useFetch } from "hooks";
import { usePlayerContext } from "context/player";
import { getArtists, addArtistId } from "services/artists";
import { getLabels, addLabelId } from "services/labels";
import { getReleases, getUpcomings } from "services/tracks";

export default function Home() {
  const [releases, setReleases] = useState<Track[]>([]);
  const [upcomings, setUpcomings] = useState<Track[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [labels, setLabels] = useState<Label[]>([]);

  const { fetch, isLoading } = useFetch();
  const { loadPlaylist } = usePlayerContext();

  const handlePlayFeed = (playlist: Track[]): void => {
    loadPlaylist({ track: playlist[0], playlist });
  };

  const handleAddArtist = async (artistId: string) => {
    await addArtistId(artistId);
  };

  const handleAddLabel = async (labelId: string) => {
    await addLabelId(labelId);
  };

  useEffect(() => {
    fetch<Track[]>(getReleases).then((tracks) => {
      tracks && setReleases(tracks);
    });

    fetch<Track[]>(getUpcomings).then((tracks) => {
      tracks && setUpcomings(tracks);
    });
  }, []);

  useEffect(() => {
    getArtists({ sort: "createdAt", length: 7 }).then((artists) => {
      artists.length && setArtists(artists);
    });
  }, []);

  useEffect(() => {
    getLabels({ sort: "createdAt", length: 7 }).then((labels) => {
      labels.length && setLabels(labels);
    });
  }, []);

  return (
    <>
      <MetaTags title="Beat Releases | Latest releases from your favorite artists and labels" />

      <Container maxW="container.xl" mt={{ base: 16, sm: 20 }}>
        <VStack spacing={12} alignItems="initial">
          <Box as="section">
            <Heading as="h2" size="md" mb={8}>
              Feed
            </Heading>

            <Grid gridTemplateColumns="repeat(3, 1fr)" gap={2}>
              <FeedCard
                countTracks={0}
                isLoading={isLoading}
                onPlay={() => handlePlayFeed(upcomings)}
                title="Favorites Tracks"
                to="/favorites"
              />

              <FeedCard
                countTracks={releases.length}
                isLoading={isLoading}
                onPlay={() => handlePlayFeed(releases)}
                title="Releases"
                to="/releases"
              />

              <FeedCard
                countTracks={upcomings.length}
                isLoading={isLoading}
                onPlay={() => handlePlayFeed(upcomings)}
                title="Upcomings"
                to="/upcomings"
              />
            </Grid>
          </Box>

          <VStack as="section" alignItems="initial">
            <Heading as="h2" size="md">
              Last Releases
            </Heading>

            <Heading as="h3" size="xs" color="gray.500" fontWeight="normal" mb={8}>
              New Releases this week 🔥
            </Heading>

            <TrackList
              tracks={[...releases].splice(0, 5)}
              setTracks={setReleases}
              isLoading={isLoading}
            />
          </VStack>

          <Box as="section">
            <HStack mb={8} justifyContent="space-between" fontSize="sm">
              <Heading as="h2" size="md">
                Recent Artist Followed
              </Heading>

              <Link as={ReactLink} to="/artists" color="gray.300" _hover={{ color: "#01FF95" }}>
                View all
              </Link>
            </HStack>

            <CardList
              size="sm"
              type="artist"
              datas={[...artists].slice(0, 6)}
              isLoading={isLoading}
              onNew={handleAddArtist}
            />
          </Box>

          <Box as="section" w="100%">
            <HStack mb={8} justifyContent="space-between" fontSize="sm">
              <Heading as="h2" size="md">
                Recent Labels Followed
              </Heading>

              <Link as={ReactLink} to="/labels" color="gray.300" _hover={{ color: "#01FF95" }}>
                View all
              </Link>
            </HStack>

            <CardList
              size="sm"
              type="label"
              datas={[...labels].splice(0, 6)}
              isLoading={isLoading}
              onNew={handleAddLabel}
            />
          </Box>
        </VStack>
      </Container>
    </>
  );
}
