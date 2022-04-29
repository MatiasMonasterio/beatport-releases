import type { Artist } from "types";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Heading, Flex, Link, Box, Container, Alert } from "@chakra-ui/react";

import { TrackCard, DeleteArtist } from "components";
import { getArtistById, deleteArtistsById } from "services/artists";

export default function ArtistById(): JSX.Element {
  const { id } = useParams<{ id: string }>() as { id: string };
  const [artist, setArtits] = useState<Artist>({} as Artist);

  const handleRemoveArtist = async (): Promise<void> => {
    await deleteArtistsById(id);
  };

  useEffect(() => {
    getArtistById(id).then((artistResp) => {
      artistResp && setArtits(artistResp);
      console.log(artist);
    });
  }, []);

  return (
    <>
      <Box
        mb={10}
        backgroundImage={artist.artwork}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center"
        h={400}
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
        <Heading size="md" mb={6}>
          Last Releases
        </Heading>

        <Flex direction="column" gap={2}>
          {artist.tracks?.length ? (
            artist.tracks.map((track) => <TrackCard {...track} key={track.name} />)
          ) : (
            <Alert bg="rgba(254, 235, 200, 0.2)">no results</Alert>
          )}
        </Flex>
      </Container>
    </>
  );
}