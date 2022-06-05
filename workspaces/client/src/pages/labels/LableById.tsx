import type { Label, Track } from "@br/core";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Heading, Flex, Link, Box, Container, Skeleton } from "@chakra-ui/react";

import { useFetch } from "hooks";
import { MetaTags, TrackList } from "components";
import { getLabelById } from "services/labels";

export default function LabelById(): JSX.Element {
  const { id } = useParams<{ id: string }>() as { id: string };
  const [label, setLabel] = useState<Label>({} as Label);
  const { fetch, isLoading } = useFetch();

  const sortTracks = (tracks: Track[]): void => {
    setLabel(() => ({ ...label, tracks: tracks }));
  };

  useEffect(() => {
    fetch<Label | null>(async () => await getLabelById(id)).then((labelResp) => {
      labelResp && setLabel(labelResp);
    });
  }, []);

  return (
    <>
      {label.name && <MetaTags title={label.name} />}

      <Box
        mb={10}
        backgroundImage={label.artwork}
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
                  <Heading>{label.name}</Heading>
                </Flex>

                <Link isExternal href={label.profile} fontSize="sm" color="gray.400" mr="auto">
                  Go to beatport profile
                </Link>
              </>
            )}
          </Container>
        </Flex>
      </Box>

      <Container maxW="container.xl">
        <Heading as="h2" size="md" mb={4}>
          Last Releases
        </Heading>
      </Container>

      <TrackList tracks={label.tracks || []} setTracks={sortTracks} isLoading={isLoading} />
    </>
  );
}
