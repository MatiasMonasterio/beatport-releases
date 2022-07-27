import type { Artist } from "@br/core";

import { useNavigate } from "react-router-dom";
import { Heading, HStack, Skeleton } from "@chakra-ui/react";

import { MetaTags } from "components";
import { useGetInitialData } from "hooks";

import { Search, CardList } from "@/dashboard/components";
import { useSearch } from "@/dashboard/hooks";
import { getArtists, addArtistId } from "@/dashboard/services/artists";

export default function Artists() {
  const navigate = useNavigate();

  const { data: artists, isLoading } = useGetInitialData({
    request: getArtists,
    defaultValue: [],
  });

  const { results } = useSearch<Artist>(artists);

  const handleAddArtist = async (artistId: string) => {
    const newArtist = await addArtistId(artistId);
    if (newArtist) navigate(`/artist/${newArtist.id}`);
  };

  return (
    <>
      <MetaTags title="Artists" />

      <HStack justify="space-between" mb={8} align="center">
        {isLoading && <Skeleton width="110px" h="1.5rem" />}

        {!isLoading && (
          <Heading as="h2" size="lg">
            {results.length} Artists
          </Heading>
        )}

        <Search placeholder="Search in artists" />
      </HStack>

      <CardList
        size="md"
        type="artist"
        datas={results}
        isLoading={isLoading}
        onNew={handleAddArtist}
      />
    </>
  );
}
