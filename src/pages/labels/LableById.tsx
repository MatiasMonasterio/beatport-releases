import type { Label } from "types";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Heading, Flex, Link, Box, Container, Alert } from "@chakra-ui/react";

import { TrackCard } from "components";
import { getLabelById } from "services/labels";

export default function LabelById(): JSX.Element {
  const { id } = useParams<{ id: string }>() as { id: string };
  const [label, setLabel] = useState<Label>({} as Label);

  useEffect(() => {
    getLabelById(id).then((labelResp) => {
      labelResp && setLabel(labelResp);
    });
  }, []);

  return (
    <>
      <Box
        mb={10}
        backgroundImage={label.artwork}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center"
        h={400}
      >
        <Flex h="100%" bg="rgba(0,0,0,0.6)" direction="column" justify="end" py={10}>
          <Container maxW="container.xl">
            <Flex justify="space-between" align="center">
              <Heading>{label.name}</Heading>
            </Flex>

            <Link isExternal href={label.profile} fontSize="sm" color="gray.400" mr="auto">
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
          {label.tracks?.length ? (
            label.tracks.map((track) => <TrackCard {...track} key={track.id} />)
          ) : (
            <Alert bg="rgba(254, 235, 200, 0.2)">no results</Alert>
          )}
        </Flex>
      </Container>
    </>
  );
}
