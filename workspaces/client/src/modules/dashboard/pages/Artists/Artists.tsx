import type { Artist } from "@br/core";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heading, HStack, Skeleton } from "@chakra-ui/react";

import { MetaTags } from "components";
import { useFetch } from "hooks";

import { Search, CardList } from "@/dashboard/components";
import { useSearch } from "@/dashboard/hooks";
import { getArtists, addArtistId } from "@/dashboard/services/artists";

export default function Artists() {
  const navigate = useNavigate();
  const [artists, setArtists] = useState<Artist[]>([]);

  const { results } = useSearch<Artist>(artists);
  const { fetch, isLoading } = useFetch();

  const handleAddArtist = async (artistId: string) => {
    const newArtist = await addArtistId(artistId);
    if (newArtist) navigate(`/artist/${newArtist.id}`);
  };

  useEffect(() => {
    fetch<Artist[]>(getArtists).then((artists) => {
      artists?.length && setArtists(artists);
    });
  }, []);

  return (
    <>
      <MetaTags title="Artists" />

      <HStack justify="space-between" mb={8} align="center">
        {isLoading && (
          <Skeleton width="110px" h="1.5rem" startColor="gray.800" endColor="gray.700" />
        )}

        {!isLoading && (
          <Heading as="h2" size="md">
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
