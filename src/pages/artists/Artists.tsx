import { Artist } from "types";

import { useState, useEffect } from "react";
import { Heading, Grid, GridItem, Flex } from "@chakra-ui/react";

import { ArtistCard, AddArtist } from "components";
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
      <Flex justify="space-between" mt={24}>
        <Heading as="h2" size="lg" mb={10}>
          Artists
        </Heading>

        <AddArtist handleAddArtist={handleAddArtist} />
      </Flex>

      <Grid templateColumns="1fr 1fr 1fr" gap={2}>
        {artists.map((artist) => (
          <GridItem key={artist.id}>
            <ArtistCard {...artist} />
          </GridItem>
        ))}
      </Grid>
    </>
  );
}
