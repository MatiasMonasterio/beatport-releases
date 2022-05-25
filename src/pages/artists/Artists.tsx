import { Artist } from "types";

import { useState, useEffect } from "react";
import { Heading, Grid, GridItem, Flex, Container } from "@chakra-ui/react";

import { MetaTags, ArtistCard, AddArtist } from "components";
import { getArtists, addArtistId } from "services/artists";

export default function Artists() {
  const [artists, setArtists] = useState<Artist[]>([]);

  const handleAddArtist = async (beatport: string): Promise<void> => {
    const newArtist = await addArtistId(beatport);
    newArtist && setArtists((artists) => [...artists, newArtist]);
  };

  useEffect(() => {
    getArtists().then((artists) => {
      artists && setArtists(artists);
    });
  }, []);

  return (
    <>
      <MetaTags title="Artists" />

      <Container maxW="container.xl" mt={{ base: 16, sm: 20 }}>
        <Flex justify="space-between">
          <Heading as="h2" size="md" mb={8}>
            Artists
          </Heading>

          <AddArtist handleAddArtist={handleAddArtist} />
        </Flex>

        <Grid
          templateColumns={{
            base: "repeat(auto-fill, minmax(160px, 1fr))",
            sm: "repeat(auto-fill, minmax(350px, 1fr))",
          }}
          gap={2}
        >
          {artists.map((artist) => (
            <GridItem key={artist.id}>
              <ArtistCard {...artist} />
            </GridItem>
          ))}
        </Grid>
      </Container>
    </>
  );
}
