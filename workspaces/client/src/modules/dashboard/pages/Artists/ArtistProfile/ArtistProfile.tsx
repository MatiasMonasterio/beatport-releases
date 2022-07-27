import type { Artist } from "@br/core";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Heading, Flex, Link, Box, Container, Skeleton, HStack, VStack } from "@chakra-ui/react";

import { MetaTags } from "components";
import { useHttpRequest } from "hooks";

import { TrackList, Follow, PlayButtonPlaylist } from "@/dashboard/components";
import { useParallax } from "@/dashboard/hooks";
import { getArtistById, deleteArtistsById, addArtistId } from "@/dashboard/services/artists";

export default function ArtistProfile(): JSX.Element {
  const { id } = useParams<{ id: string }>() as { id: string };
  const { parallaxRef } = useParallax();

  const [artist, setArtits] = useState<Artist>({} as Artist);
  const { callRequest, isLoading } = useHttpRequest();

  const handleFollow = async (isFolling: boolean): Promise<void> => {
    if (isFolling) await deleteArtistsById(id);
    else await addArtistId(id);
  };

  useEffect(() => {
    setArtits({} as Artist);

    callRequest(async () => await getArtistById(id)).then((response) => {
      setArtits(response);
    });
  }, [id]);

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
            {isLoading ? (
              <>
                <Skeleton width="250px" height="2.1rem" mb={2} />
                <Skeleton width="150px" height="0.9rem" />
              </>
            ) : (
              <HStack gap={2}>
                <PlayButtonPlaylist playlist={artist.tracks} disabled={!artist.tracks?.length} />

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
              </HStack>
            )}
          </Container>
        </Flex>
      </Box>

      <Container maxW="container.xl">
        <Heading as="h2" size="md" mb={4}>
          Releases
        </Heading>

        <Flex direction="column" gap={2}>
          <TrackList tracks={artist.tracks || []} isLoading={isLoading} />
        </Flex>
      </Container>
    </>
  );
}
