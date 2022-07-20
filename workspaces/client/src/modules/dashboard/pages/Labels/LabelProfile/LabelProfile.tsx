import type { Label } from "@br/core";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Heading, Flex, Link, Box, Container, Skeleton, HStack, VStack } from "@chakra-ui/react";

import { MetaTags } from "components";
import { useFetch } from "hooks";

import { TrackList, Follow, PlayButtonPlaylist } from "@/dashboard/components";
import { useParallax } from "@/dashboard/hooks";
import { getLabelById, addLabelId, deleteLabelById } from "@/dashboard/services/labels";

export default function LabelProfile(): JSX.Element {
  const { id } = useParams<{ id: string }>() as { id: string };
  const { parallaxRef } = useParallax();

  const [label, setLabel] = useState<Label>({} as Label);
  const { fetch, isLoading } = useFetch();
  const { fetch: fetchRuntime, isLoading: isLoadingRuntime } = useFetch();

  const handleFollow = async (): Promise<void> => {
    if (label.follow) await fetchRuntime(async () => await deleteLabelById(id));
    else await fetchRuntime(async () => await addLabelId(id));

    setLabel(() => ({ ...label, follow: !label.follow }));
  };

  useEffect(() => {
    setLabel({} as Label);

    fetch<Label | null>(async () => await getLabelById(id)).then((labelResp) => {
      labelResp && setLabel(labelResp);
    });
  }, [id]);

  return (
    <>
      {label.name && <MetaTags title={label.name} />}

      <Box mb={10} h={{ base: 300, sm: 350 }} position="relative" zIndex={1} overflow="hidden">
        <Box
          ref={parallaxRef}
          backgroundImage={label.artwork}
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          backgroundPosition="center"
          position="absolute"
          w="100%"
          h="100%"
          zIndex={-1}
        />

        <Flex h="100%" bg="rgba(0,0,0,0.6)" direction="column" justify="end" py={10}>
          <Container maxW="container.xl">
            {isLoading ? (
              <>
                <Skeleton width="250px" height="2.1rem" mb={2} />
                <Skeleton width="150px" height="0.9rem" />
              </>
            ) : (
              <HStack gap={2}>
                <PlayButtonPlaylist playlist={label.tracks} disabled={!label.tracks?.length} />

                <VStack align="flex-start">
                  <HStack alignItems="end">
                    <Heading>{label.name}</Heading>
                    <Follow
                      isFollowing={!!label.follow}
                      isLoading={isLoadingRuntime}
                      onClick={handleFollow}
                    />
                  </HStack>

                  <Link
                    isExternal
                    href={label.profile}
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
          Last Releases
        </Heading>

        <TrackList tracks={label.tracks || []} isLoading={isLoading} />
      </Container>
    </>
  );
}
