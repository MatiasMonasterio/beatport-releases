import type { Artist, Track } from "@br/core";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Heading, Flex, Link, Box, Container, Skeleton } from "@chakra-ui/react";

import { useFetch } from "hooks";
import { MetaTags, DeleteArtist, TrackList } from "components";
import { getArtistById, deleteArtistsById } from "services/artists";

export default function ArtistById(): JSX.Element {
  const { id } = useParams<{ id: string }>() as { id: string };
  const [artist, setArtits] = useState<Artist>({} as Artist);
  const { fetch, isLoading } = useFetch();

  const sortTracks = (tracks: Track[]): void => {
    setArtits(() => ({ ...artist, tracks: tracks }));
  };

  const handleRemoveArtist = async (): Promise<void> => {
    await deleteArtistsById(id);
  };

  useEffect(() => {
    fetch<Artist | null>(async () => await getArtistById(id)).then((artistResp) => {
      artistResp && setArtits(artistResp);
    });
  }, []);

  return (
    <>
      {artist.name && <MetaTags title={artist.name} />}

      <Box
        mb={8}
        backgroundImage={artist.artwork}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center"
        h={{ base: 300, sm: 400 }}
      >
        <Flex h="100%" bg="rgba(0,0,0,0.6)" direction="column" justify="end" py={10}>
          <Container maxW="container.xl">
            {isLoading ? (
              <>
                <Skeleton
                  width="250px"
                  height="2.1rem"
                  startColor="gray.800"
                  endColor="gray.700"
                  mb={2}
                />
                <Skeleton width="150px" height="0.9rem" startColor="gray.800" endColor="gray.700" />
              </>
            ) : (
              <>
                <Flex justify="space-between" align="center">
                  <Heading>{artist.name}</Heading>
                  <DeleteArtist handleRemoveArtist={handleRemoveArtist} />
                </Flex>

                <Link isExternal href={artist.profile} fontSize="sm" color="gray.400" mr="auto">
                  Go to beatport profile
                </Link>
              </>
            )}
          </Container>
        </Flex>
      </Box>

      <Container maxW="container.xl">
        <Heading as="h2" size="md" mb={4}>
          Releases
        </Heading>
      </Container>

      <Flex direction="column" gap={2}>
        <TrackList tracks={artist.tracks || []} setTracks={sortTracks} isLoading={isLoading} />
      </Flex>
    </>
  );
}
