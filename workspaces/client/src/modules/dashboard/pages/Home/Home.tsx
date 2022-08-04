import type { ApiParams } from "@br/core";

import { Link as ReactLink } from "react-router-dom";
import { Container, Heading, VStack, Box, Grid, HStack, Link } from "@chakra-ui/react";

import { MetaTags } from "components";
import { useGetInitialData } from "hooks";

import { TrackList, FeedCard, CardList } from "@/dashboard/components";
import { getArtists, addArtistId } from "@/dashboard/services/artists";
import { getLabels, addLabelId } from "@/dashboard/services/labels";
import { getReleases, getUpcomings } from "@/dashboard/services/tracks";
import { getFavorites } from "@/dashboard/services/favorites";

export default function Home() {
  const { data: artists, isLoading: artistIsLoading } = useGetInitialData({
    request: async () => await getArtists({ sort: "createdAt", length: 6 }),
    defaultValue: [],
  });

  const { data: labels, isLoading: labelIsLoading } = useGetInitialData({
    request: async () => await getLabels({ sort: "createdAt", length: 6 }),
    defaultValue: [],
  });

  const getReleasesRequest = async (params?: ApiParams) => {
    return await getReleases({ ...params, length: 6 });
  };

  const handleAddArtist = async (artistId: string) => {
    await addArtistId(artistId);
  };

  const handleAddLabel = async (labelId: string) => {
    await addLabelId(labelId);
  };

  return (
    <>
      <MetaTags title="Beat Releases | Latest releases from your favorite artists and labels" />

      <Container maxW="container.xl" mt={{ base: 16, sm: 20 }}>
        <VStack spacing={12} alignItems="initial">
          <Box as="section">
            <Heading as="h2" size="md" mb={4}>
              Feed
            </Heading>

            <Grid gridTemplateColumns="repeat(3, 1fr)" gap={2}>
              <FeedCard title="Favorites" to="/favorites" request={getFavorites} />
              <FeedCard title="Releases" to="/releases" request={getReleases} />
              <FeedCard title="Upcomings" to="/upcomings" request={getUpcomings} />
            </Grid>
          </Box>

          <VStack as="section" alignItems="initial">
            <Heading as="h2" size="md">
              Last Releases
            </Heading>

            <Heading as="h3" size="xs" color="secondary.gray.500" fontWeight="normal" mb={8}>
              New Releases this week 🔥
            </Heading>

            <TrackList request={getReleasesRequest} />
          </VStack>

          <Box as="section">
            <HStack mb={4} justifyContent="space-between" fontSize="sm">
              <Heading as="h2" size="md">
                Recent Artist Followed
              </Heading>

              <Link
                as={ReactLink}
                to="/artists"
                color="secondary.gray.700"
                _hover={{ color: "primary.green" }}
              >
                View all
              </Link>
            </HStack>

            <CardList
              size="sm"
              type="artist"
              datas={artists}
              isLoading={artistIsLoading}
              onNew={handleAddArtist}
            />
          </Box>

          <Box as="section" w="100%">
            <HStack mb={4} justifyContent="space-between" fontSize="sm">
              <Heading as="h2" size="md">
                Recent Labels Followed
              </Heading>

              <Link
                as={ReactLink}
                to="/labels"
                color="secondary.gray.700"
                _hover={{ color: "primary.green" }}
              >
                View all
              </Link>
            </HStack>

            <CardList
              size="sm"
              type="label"
              datas={labels}
              isLoading={labelIsLoading}
              onNew={handleAddLabel}
            />
          </Box>
        </VStack>
      </Container>
    </>
  );
}
