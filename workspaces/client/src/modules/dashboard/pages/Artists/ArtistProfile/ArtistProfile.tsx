import type { Artist, Track } from "@br/core";

import { useState } from "react";
import { useParams } from "react-router-dom";
import { Heading, Flex, Link, Box, Container, Skeleton, HStack, VStack } from "@chakra-ui/react";

import { MetaTags } from "components";
import { useGetInitialData } from "hooks";

import { TrackList, Follow, PlayButtonLg } from "@/dashboard/components";
import { useParallax } from "@/dashboard/hooks";
import {
  getArtistById,
  deleteArtistsById,
  addArtistId,
  getTracksByArtistId,
} from "@/dashboard/services/artists";

export default function ArtistProfile(): JSX.Element {
  const [artistTracks, setArtistTracks] = useState<Track[]>([]);
  const { id } = useParams<{ id: string }>() as { id: string };
  const { parallaxRef } = useParallax();

  const { data: artist, isLoading } = useGetInitialData({
    request: async () => await getArtistById(id),
    defaultValue: {} as Artist,
    deps: [id],
  });

  const handleFollow = async (isFolling: boolean): Promise<void> => {
    if (isFolling) await deleteArtistsById(id);
    else await addArtistId(id);
  };

  return (
    <>
      {artist.name && <MetaTags title={artist.name} />}

      <Box mb={8} h={{ base: 300, sm: 350 }} position="relative" zIndex={1} overflow="hidden">
        <Box
          ref={parallaxRef}
          backgroundImage={artist.artwork}
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          backgroundPosition="center 30%"
          position="absolute"
          w="100%"
          h="100%"
          zIndex={-1}
        />

        <Flex h="100%" bg="blackAlpha.600" direction="column" justify="end" py={10}>
          <Container maxW="container.xl">
            <HStack gap={2}>
              <PlayButtonLg playlist={artistTracks} />

              {isLoading && (
                <VStack align="flex-start">
                  <Skeleton width="250px" height="2.1rem" mb={2} />
                  <Skeleton width="150px" height="0.9rem" />
                </VStack>
              )}

              {!isLoading && (
                <VStack align="flex-start">
                  <HStack alignItems="end">
                    <Heading>{artist.name}</Heading>
                    <Follow isFollowing={!!artist.follow} onFollow={handleFollow} />
                  </HStack>

                  <Link
                    isExternal
                    href={artist.profile}
                    fontSize="sm"
                    color="secondary.gray.200"
                    mr="auto"
                  >
                    Go to beatport profile
                  </Link>
                </VStack>
              )}
            </HStack>
          </Container>
        </Flex>
      </Box>

      <Container maxW="container.xl">
        <Heading as="h2" size="md" mb={4}>
          Releases
        </Heading>

        <Flex direction="column" gap={2}>
          <TrackList request={async () => await getTracksByArtistId(id)} onLoad={setArtistTracks} />
        </Flex>
      </Container>
    </>
  );
}
