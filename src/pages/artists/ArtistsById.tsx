import type { Artist, Track } from "types";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Heading, Flex, Link, Box, Container, Alert } from "@chakra-ui/react";

import { MetaTags, DeleteArtist, TrackList } from "components";
import { getArtistById, deleteArtistsById } from "services/artists";

export default function ArtistById(): JSX.Element {
  const { id } = useParams<{ id: string }>() as { id: string };
  const [artist, setArtits] = useState<Artist>({} as Artist);

  const sortTracks = (tracks: Track[]): void => {
    setArtits(() => ({ ...artist, tracks: tracks }));
  };

  const handleRemoveArtist = async (): Promise<void> => {
    await deleteArtistsById(id);
  };

  useEffect(() => {
    getArtistById(id).then((artistResp) => {
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
            <Flex justify="space-between" align="center">
              <Heading>{artist.name}</Heading>
              <DeleteArtist handleRemoveArtist={handleRemoveArtist} />
            </Flex>

            <Link isExternal href={artist.profile} fontSize="sm" color="gray.400" mr="auto">
              Go to beatport profile
            </Link>
          </Container>
        </Flex>
      </Box>

      <Container maxW="container.xl">
        <Heading as="h2" size="md" mb={4}>
          Releases
        </Heading>
      </Container>

      <Flex direction="column" gap={2}>
        {artist.tracks?.length ? (
          <TrackList tracks={artist.tracks} setTracks={sortTracks} />
        ) : (
          <Container maxW="container.xl">
            <Alert bg="rgba(254, 235, 200, 0.2)">no results</Alert>
          </Container>
        )}
      </Flex>
    </>
  );
}
